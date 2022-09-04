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
