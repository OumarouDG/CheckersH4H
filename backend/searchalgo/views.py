from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import wordnet
from rank_bm25 import BM25Okapi
import sqlite3
from fuzzywuzzy import fuzz
import json

model = SentenceTransformer('all-mpnet-base-v2')

nltk.download('wordnet')

def expand_with_synonyms(text):
    words = text.split()
    expanded_words = []
    for word in words:
        synonyms = wordnet.synsets(word)
        if synonyms:
            expanded_words.append(synonyms[0].lemmas()[0].name())  
        else:
            expanded_words.append(word)
    return " ".join(expanded_words)

def fetch_data_from_db():
    conn = sqlite3.connect('scholar_data.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, title, url FROM scholar_results")  # Assuming the table is named 'scholar_results'
    rows = cursor.fetchall()
    
    conn.close()
    
    return rows  

def min_max_rescale(scores):
    min_score = min(scores)
    max_score = max(scores)

    if max_score == min_score:
        return [50 for _ in scores]  

    return [100 * (s - min_score) / (max_score - min_score) for s in scores]

def fuzzy_match(claim, title):
    return fuzz.partial_ratio(claim.lower(), title.lower()) / 100  

def compare_claim_with_titles(claim, titles):
    expanded_claim = expand_with_synonyms(claim)

    if not titles:
        return []

    tokenized_titles = [title.split() for title in titles]
    bm25 = BM25Okapi(tokenized_titles)
    claim_tokens = expanded_claim.split()

    bm25_scores = bm25.get_scores(claim_tokens)

    top_indices = sorted(range(len(bm25_scores)), key=lambda i: bm25_scores[i], reverse=True)[:200]
    top_titles = [titles[i] for i in top_indices]

    claim_embedding = model.encode([expanded_claim])  
    title_embeddings = model.encode(top_titles)  

    similarities = cosine_similarity(claim_embedding, title_embeddings)[0]

    rescaled_similarities = min_max_rescale(similarities)

    fuzzy_scores = [fuzzy_match(expanded_claim, t) * 100 for t in top_titles]

    final_scores = [
        (
            top_titles[i],
            0.9 * rescaled_similarities[i] + 0.1 * bm25_scores[top_indices[i]] + 0.1 * fuzzy_scores[i],
        )
        for i in range(len(top_titles))
    ]

    final_scores = [(title, min(max(score, 0), 100)) for title, score in final_scores]

    final_scores.sort(key=lambda x: x[1], reverse=True)

    return final_scores

class ClaimSearchView(APIView):
    def get(self, request, *args, **kwargs):
        claim = request.query_params.get('claim', None)  
        if not claim:
            return Response({"error": "Claim parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        rows = fetch_data_from_db()

        titles = [row[1] for row in rows] 
        ids = [row[0] for row in rows]  
        urls = [row[2] for row in rows] 

        results = compare_claim_with_titles(claim, titles)

        filtered_results = [(title, score) for title, score in results if score >= 70]
        filtered_results.sort(key=lambda x: x[1], reverse=True)
        

        top_results = filtered_results[:3]

        response = [
            {
                "id": ids[titles.index(title)],  
                "title": title,
                "url": urls[titles.index(title)],  
                "score": f"{score:.2f}"
            }
            for title, score in top_results
        ]

        return Response(response, status=status.HTTP_200_OK)