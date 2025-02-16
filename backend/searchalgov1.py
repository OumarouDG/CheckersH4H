from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from bs4 import BeautifulSoup
import nltk
from nltk.corpus import wordnet
from rank_bm25 import BM25Okapi
import numpy as np
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

# Extract headlines from multiple web pages
def extract_headlines_from_urls(urls):
    """Extract headlines from multiple URLs."""
    all_headlines = []
    for url in urls:
        try:
            response = requests.get(url, timeout=5)
            soup = BeautifulSoup(response.text, "html.parser")
            headlines = [h.text.strip() for h in soup.find_all(["h1", "h2", "h3"])]
            all_headlines.extend(headlines)
        except Exception as e:
            print(f"Error fetching {url}: {e}")
    return all_headlines

# Normalize scores with Min-Max Scaling
def min_max_rescale(scores):
    """Rescale scores between 0 and 100 using Min-Max Normalization."""
    min_score = min(scores)
    max_score = max(scores)

    if max_score == min_score:
        return [50 for _ in scores]  # If all scores are identical, set to 50

    return [100 * (s - min_score) / (max_score - min_score) for s in scores]

# Soft Matching (Levenshtein Distance)
def fuzzy_match(claim, headline):
    """Use Levenshtein Distance to measure soft similarity between claim and headline."""
    return fuzz.partial_ratio(claim.lower(), headline.lower()) / 100  # Normalize to 0-1 range

# Compute similarity using BM25 + SBERT + Fuzzy Matching
def compare_claim_with_headlines(claim, headlines):
    expanded_claim = expand_with_synonyms(claim)  # Expand claim with synonyms

    if not headlines:
        return []  # Return empty if no headlines were extracted

    # BM25 Filtering First
    tokenized_headlines = [headline.split() for headline in headlines]
    bm25 = BM25Okapi(tokenized_headlines)
    claim_tokens = expanded_claim.split()

    # Get BM25 scores
    bm25_scores = bm25.get_scores(claim_tokens)

    # Select top 10 relevant headlines based on BM25 ranking
    top_indices = sorted(range(len(bm25_scores)), key=lambda i: bm25_scores[i], reverse=True)[:200]
    top_headlines = [headlines[i] for i in top_indices]

    # Use SBERT for Final Similarity Score
    claim_embedding = model.encode([expanded_claim])  # Encode expanded claim
    headline_embeddings = model.encode(top_headlines)  # Encode only top BM25 headlines

    similarities = cosine_similarity(claim_embedding, headline_embeddings)[0]  # Compute similarity

    # Rescale Similarity Scores
    rescaled_similarities = min_max_rescale(similarities)

    # Apply Fuzzy NLP Matching
    fuzzy_scores = [fuzzy_match(expanded_claim, h) * 100 for h in top_headlines]

    # Compute Hybrid Score (90% SBERT, 10% BM25, + Fuzzy Matching)
    final_scores = [
        (
            top_headlines[i],
            0.9 * rescaled_similarities[i] + 0.1 * bm25_scores[top_indices[i]] + 0.1 * fuzzy_scores[i],
        )
        for i in range(len(top_headlines))
    ]

    # Clip Scores to 0-100
    final_scores = [(headline, min(max(score, 0), 100)) for headline, score in final_scores]

    # Rank by highest score
    final_scores.sort(key=lambda x: x[1], reverse=True)

    return final_scores

# **Test Case**
claim = "Immigrants are eating pets"

# **Multiple News Sites**
urls = [
    "https://www.nbcnews.com/politics/2024-election/trump-pushes-baseless-claim-immigrants-eating-pets-rcna170537",
    "https://www.bbc.com/news/articles/c77l28myezko",
    "https://www.cnn.com/2024/02/15/politics/trump-immigrants-pet-consumption-fact-check/index.html",
    "https://theconversation.com/no-immigrants-arent-eating-dogs-and-cats-but-trumps-claim-is-part-of-an-ugly-history-of-myths-about-immigrant-foodways-239343",
    "https://www.nytimes.com/2024/09/10/us/politics/trump-debate-immigrants-pets.html", 
    "https://www.nytimes.com/2025/02/13/nyregion/drone-lost-pets.html", 
    "https://www.barrons.com/articles/buy-freshpet-stock-price-pick-5e88eb80", 
    "https://www.nbcnews.com/news/latino/trump-immigrants-republicans-latino-voter-concerns-deportation-rcna192029", 
    "https://abcnews.go.com/US/wireStory/us-deports-immigrants-venezuela-after-judge-blocked-transfer-118850147"
    
    
    
]

# Extract headlines from multiple news sites
headlines = extract_headlines_from_urls(urls)

# Compare the claim with extracted headlines
results = compare_claim_with_headlines(claim, headlines)

# Display results
if results:
    for headline, score in results:
        print(f"Hybrid Similarity Score: {score:.2f} | Headline: {headline}")
else:
    print("No relevant headlines found.")