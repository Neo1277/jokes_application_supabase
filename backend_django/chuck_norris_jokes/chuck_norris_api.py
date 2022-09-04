import requests

import json

class ChuckNorrisAPIRequests(object):

    url_api = 'https://api.chucknorris.io/jokes'

    def __init__(self, url_api=url_api):
        self.url_api = url_api

    def get_random_chuck_norris_joke(self):

        # Send request
        response = requests.get(self.url_api+'/random')

        return json.loads(response.content)
