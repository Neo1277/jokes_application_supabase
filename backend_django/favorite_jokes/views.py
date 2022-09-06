from rest_framework.views import APIView
from rest_framework import status
from .favorite_jokes_supabase import FavoriteJokes
from rest_framework.response import Response

class SaveFavoriteJokeView(APIView):

    def post(self, request):
        favorite_jokes = FavoriteJokes()
        save_favorite_joke = favorite_jokes.create(request.data)
        return Response({'success':True,'message':'Favorite Joke saved succesfully'})

class RetrieveUserFavoriteJokesView(APIView):

    def get(self, request):
        favorite_jokes = FavoriteJokes()
        user_favorite_jokes = favorite_jokes.get_user_favorite_jokes()
        return Response(user_favorite_jokes.data)