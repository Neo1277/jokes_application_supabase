from django.urls import include, path
from . import views

urlpatterns = [
    path('api/chuck_norris_random_joke', views.ChuckNorrisRandomJokeView.as_view(),
                                            name='retrieve-chuck-norris-random-joke'),
]