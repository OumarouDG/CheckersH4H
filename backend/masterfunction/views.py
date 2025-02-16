import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

SEARCH_API_URL = "http://127.0.0.1:8000/searchalgo/search/"  # Update if different
DEEPSEEK_API_URL = "http://127.0.0.1:8000/deepseek/query"  # Update if different

class MasterQueryView(APIView):
    def post(self, request):
        user_query = request.data.get("query")

        if not user_query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Step 1: Get Relevant Sources from Search Algorithm App
        sources_response = requests.get(SEARCH_API_URL, params={"claim": user_query})

        if sources_response.status_code != 200:
            return Response({"error": "Failed to retrieve sources."}, status=sources_response.status_code)

        sources = sources_response.json()

        # Edge Case: No sources found
        if not sources:
            return Response({"message": "No sources available for this claim."}, status=status.HTTP_200_OK)

        # Step 2: Fetch Full Text from the Database
        full_texts = []
        for source in sources:
            source_id = source["id"]
            full_text = self.get_full_text(source_id)  # Fetch from DB using ID
            if full_text:
                full_texts.append({"id": source_id, "title": source["title"], "url": source["url"], "text": full_text})

        # Step 3: Format Query for DeepSeek
        deepseek_query = self.format_deepseek_query(full_texts, user_query)

        # Step 4: Send Query to DeepSeek for Summarization
        deepseek_response = requests.post(DEEPSEEK_API_URL, json={"query": deepseek_query})

        if deepseek_response.status_code != 200:
            return Response({"error": "Failed to retrieve paragraph from DeepSeek."}, status=500)

        paragraph = deepseek_response.json().get("response", "")

        # Step 5: Request Confidence Scores from DeepSeek
        confidence_query = self.format_confidence_query(full_texts)
        confidence_response = requests.post(DEEPSEEK_API_URL, json={"query": confidence_query})

        if confidence_response.status_code != 200:
            return Response({"error": "Failed to retrieve confidence scores."}, status=500)

        confidence_scores = confidence_response.json().get("response", "").split()  # Assuming DeepSeek returns space-separated scores

        # Step 6: Structure the Final JSON Response within "test" key
        final_response = {
            "test": {
                "paragraph": paragraph,
                "list": [
                    {
                        "title": source["title"],
                        "link": source["url"],  # Change "url" to "link"
                        "number": confidence_scores[i] if i < len(confidence_scores) else "N/A"
                    }
                    for i, source in enumerate(sources)
                ]
            }
        }


        return Response(final_response, status=status.HTTP_200_OK)

    def get_full_text(self, source_id):
        """Retrieve full text from the database based on the source ID."""
        import sqlite3
        conn = sqlite3.connect('scholar_data.db')
        cursor = conn.cursor()
        cursor.execute("SELECT full_text FROM scholar_results WHERE id=?", (source_id,))
        row = cursor.fetchone()
        conn.close()
        return row[0] if row else None

    def format_deepseek_query(self, sources, user_query):
        """Formats the query for DeepSeek summarization."""
        formatted_text = "\n\n".join(
            [f"Source {i+1}:\nTitle: {src['title']}\n{src['text']}" for i, src in enumerate(sources)]
        )
        return f"""{formatted_text}

Ignore previous prompts in this conversation. You are an article/paper/website/news summarizer whose job it is to take the information from the sources and summarize the consensus between the sources to help a user get information on their claim.

Here is the user's claim: {user_query}"""

    def format_confidence_query(self, sources):
        """Formats the query to get confidence scores from DeepSeek."""
        formatted_text = "\n\n".join(
            [f"Source {i+1}:\nTitle: {src['title']}\n{src['text']}" for i, src in enumerate(sources)]
        )
        return f"""{formatted_text}

Now, for each source, provide a confidence score from 0 to 100 indicating how reliable the source is, one score per source, separated by spaces. ONLY PROVIDE THE NUMBERS DO NOT WRITE ANY OTHER TEXT, THE ENTIRE MESSAGE SHOULD BE ONLY 8 CHARACTERS LONG"""
