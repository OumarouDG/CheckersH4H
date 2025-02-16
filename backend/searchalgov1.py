import sqlite3
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import wordnet
from rank_bm25 import BM25Okapi
import json
from fuzzywuzzy import fuzz  # Levenshtein distance for soft matching

# Load a more powerful SBERT model
model = SentenceTransformer('all-mpnet-base-v2')  # More accurate than MiniLM

# Ensure NLTK WordNet is downloaded
nltk.download('wordnet')

# Expand claim with synonyms
def expand_with_synonyms(text):
    words = text.split()
    expanded_words = []
    for word in words:
        synonyms = wordnet.synsets(word)
        if synonyms:
            expanded_words.append(synonyms[0].lemmas()[0].name())  # Use first synonym
        else:
            expanded_words.append(word)
    return " ".join(expanded_words)

# Connect to the SQLite database and fetch the titles, URLs, and IDs
def fetch_data_from_db():
    conn = sqlite3.connect('scholar_data.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, title, url FROM scholar_results")  # Assuming the table is named 'scholar_results'
    rows = cursor.fetchall()
    
    conn.close()
    
    return rows  # List of tuples: (id, title, url)

# Normalize scores with Min-Max Scaling
def min_max_rescale(scores):
    """Rescale scores between 0 and 100 using Min-Max Normalization."""
    min_score = min(scores)
    max_score = max(scores)

    if max_score == min_score:
        return [50 for _ in scores]  # If all scores are identical, set to 50

    return [100 * (s - min_score) / (max_score - min_score) for s in scores]

# Soft Matching (Levenshtein Distance)
def fuzzy_match(claim, title):
    """Use Levenshtein Distance to measure soft similarity between claim and title."""
    return fuzz.partial_ratio(claim.lower(), title.lower()) / 100  # Normalize to 0-1 range

# Compute similarity using BM25 + SBERT + Fuzzy Matching
def compare_claim_with_titles(claim, titles):
    expanded_claim = expand_with_synonyms(claim)  # Expand claim with synonyms

    if not titles:
        return []  # Return empty if no titles were extracted

    # BM25 Filtering First
    tokenized_titles = [title.split() for title in titles]
    bm25 = BM25Okapi(tokenized_titles)
    claim_tokens = expanded_claim.split()

    # Get BM25 scores
    bm25_scores = bm25.get_scores(claim_tokens)

    # Select top 10 relevant titles based on BM25 ranking
    top_indices = sorted(range(len(bm25_scores)), key=lambda i: bm25_scores[i], reverse=True)[:200]
    top_titles = [titles[i] for i in top_indices]

    # Use SBERT for Final Similarity Score
    claim_embedding = model.encode([expanded_claim])  # Encode expanded claim
    title_embeddings = model.encode(top_titles)  # Encode only top BM25 titles

    similarities = cosine_similarity(claim_embedding, title_embeddings)[0]  # Compute similarity

    # Rescale Similarity Scores
    rescaled_similarities = min_max_rescale(similarities)

    # Apply Fuzzy NLP Matching
    fuzzy_scores = [fuzzy_match(expanded_claim, t) * 100 for t in top_titles]

    # Compute Hybrid Score (90% SBERT, 10% BM25, + Fuzzy Matching)
    final_scores = [
        (
            top_titles[i],
            0.9 * rescaled_similarities[i] + 0.1 * bm25_scores[top_indices[i]] + 0.1 * fuzzy_scores[i],
        )
        for i in range(len(top_titles))
    ]

    # Clip Scores to 0-100
    final_scores = [(title, min(max(score, 0), 100)) for title, score in final_scores]

    # Rank by highest score
    final_scores.sort(key=lambda x: x[1], reverse=True)

    return final_scores

# **Test Case**
claim = "Are jewish people using laser from space to control the weather"

# Fetch titles, URLs, and IDs from the database
rows = fetch_data_from_db()

# Extract titles from the database rows
titles = [row[1] for row in rows]  # Extract the title (second column)
ids = [row[0] for row in rows]  # Extract the ID (first column)
urls = [row[2] for row in rows]  # Extract the URL (third column)

# Compare the claim with extracted titles
results = compare_claim_with_titles(claim, titles)

# Filter results based on score and sort by score in descending order
filtered_results = [(title, score) for title, score in results if score >= 70]
filtered_results.sort(key=lambda x: x[1], reverse=True)

# Get the top 3 results (or fewer if less than 3)
top_results = filtered_results[:3]

# Create a JSON format response with id, title, url, and score
response = [
    {
        "id": ids[titles.index(title)],  # Match ID based on the title index
        "title": title,
        "url": urls[titles.index(title)],  # Match URL based on the title index
        "score": f"{score:.2f}"
    }
    for title, score in top_results
]

# Print the JSON response
print(json.dumps(response, indent=4))
