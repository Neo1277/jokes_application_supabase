from user.supabase_client import SupabaseClient

class FavoriteJokes(SupabaseClient):
    # register category
    def create(self, data):
        supabase = self.get_supabase_client()
        data = supabase.table("my_jokes").insert(data).execute()
        return data

    def get_user_favorite_jokes(self):
        supabase = self.get_supabase_client()
        data = (
            supabase.table("my_jokes")
                .select("*")
                #.eq('user_id', user_id)
                .execute()
        )
        return data
