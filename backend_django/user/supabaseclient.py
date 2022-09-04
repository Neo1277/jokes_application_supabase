from supabase import create_client, Client

from decouple import config

from pprint import pprint


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

    # authenticate user
    async def sign_in(self, email, password):
        supabase = self.get_supabase_client()
        user = await supabase.auth.sign_in(email=email, password=password)
        return user

    async def get_user(self, jwt_token):
        supabase = self.get_supabase_client()
        #user = supabase.auth.api.getUser(jwt_token)
        #user = supabase.auth.session()
        error, result = await supabase.auth.api.get_user(jwt=jwt_token)
        if result:
            print(True)
        else:
            print(False)

        #pprint(inspect.getargspec(supabase.auth.api.get_user))
        return user

class Categories(SupabaseClient):
    # register category
    def create(self, description):
        supabase = self.get_supabase_client()
        data = supabase.table("categories").insert({"description": description}).execute()
        return data

    def get_user_jokes(self, user_id):
        supabase = self.get_supabase_client()
        data = (
            supabase.table("categories")
                .select("*")
                .eq('user_id', user_id)
                .execute()
        )
        return data

authuser = AuthUser()
#authuser_sign_in = await authuser.sign_in('admin1@gmail.com', '123456789')
#import asyncio
#authuser_get_user =  authuser.get_user(config('JWT_SECRET'))
#print(authuser_get_user)


category = Categories()
category_save = category.create('Test1')
categories_joke = category.get_user_jokes('81f84361-5e10-4c30-a318-cc1c56c22ef1')
pprint(categories_joke)


"""

random_email: str = "3hf82fijf92rarerere@supamail.com"
random_password: str = "fqj13bnf2hiu23h"

#authenticate
user = supabase.auth.sign_in(email=random_email, password=random_password)

"""


