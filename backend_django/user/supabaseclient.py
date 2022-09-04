from supabase import create_client, Client

from decouple import config

class SupabaseClient(object):

    #supabase_url = config('SUPABASE_URL')
    #supabase_key = config('SUPABASE_KEY')

    def __init__(self):
        self.supabase_client: Client = create_client(config('SUPABASE_URL'),
                                                        config('SUPABASE_KEY'))

    def get_supabase_client(self):
        return self.supabase_client

    def set_supabase_client(self, supabase_client):
        self.supabase_client = supabase_client

class AuthUser(SupabaseClient):

    # register user
    def sign_up(self, email, password):
        supabase = self.get_supabase_client()
        user = supabase.auth.sign_up(email=email, password=password)
        return user

    def get_user(self, jwt_token):
        supabase = self.get_supabase_client()
        user = supabase.auth.api.getUser(jwt_token)

        return user

authuser = AuthUser()
#authuser_sign_in = authuser.sign_up('admin@gmail.com', '123456789')
authuser_get_user = authuser.get_user('zcxzdqw41432423sfXSFDfsfd')
print(authuser_get_user)



"""

random_email: str = "3hf82fijf92rarerere@supamail.com"
random_password: str = "fqj13bnf2hiu23h"

#authenticate
user = supabase.auth.sign_in(email=random_email, password=random_password)

"""


