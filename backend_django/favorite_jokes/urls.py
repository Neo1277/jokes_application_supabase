from django.urls import include, path
from . import views

urlpatterns = [
    path('api/save_favorite_joke', views.SaveFavoriteJokeView.as_view(),
                                            name='save-favorite-joke'),
    path('api/retrieve_user_favorite_jokes', views.RetrieveUserFavoriteJokesView.as_view(),
                                            name='retrieve-user-favorite-jokes'),
]