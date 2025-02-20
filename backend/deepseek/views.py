import json
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

DEEPSEEK_SERVER_URL = "http://localhost:11434/api/generate"

class DeepSeekQueryView(APIView):
    def post(self, request):
        query = request.data.get("query")

        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            
            safe_query = json.dumps(query)  

            response = requests.post(DEEPSEEK_SERVER_URL, json={"model": "deepseek-r1:8b","prompt": safe_query})
            response_text = response.text  

            json_objects = response_text.strip().split("\n")
            parsed_responses = []
            for obj in json_objects:
                try:
                    parsed_obj = json.loads(obj)
                    if "response" in parsed_obj:
                        parsed_responses.append(parsed_obj["response"])
                except json.JSONDecodeError:
                    continue  

            final_response = "".join(parsed_responses).strip()

            final_response = re.sub(r"<think>.*?</think>", "", final_response, flags=re.DOTALL).strip()

            return Response({"query": query, "response": final_response}, status=response.status_code)

        except requests.RequestException as e:
            return Response({"error": "Error communicating with DeepSeek.", "details": str(e)}, status=500)