from rest_framework.views import APIView
from rest_framework import status
from .chuck_norris_api import ChuckNorrisAPIRequests
from rest_framework.response import Response

class ChuckNorrisRandomJokeView(APIView):

    def get(self, request):
        chuck_norris_api_requests = ChuckNorrisAPIRequests()
        random_joke = chuck_norris_api_requests.get_random_chuck_norris_joke()

        return Response(random_joke)