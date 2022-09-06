import * as ActionTypes from './ActionTypes';
import { 
  baseUrlApiRest, 
  chuck_norris_random_joke, 
  save_favorite_joke, 
  retrieve_user_favorite_jokes
} from '../shared/baseUrl';

import { supabase } from '../shared/supabaseClient';

/* Request to Laravel API and show error or proceed to dispatch the data  */
export const fetchChuckNorrisRandomJoke = () => (dispatch) => {

  dispatch(chuckNorrisRandomJokeLoading(true));

  return fetch(baseUrlApiRest + chuck_norris_random_joke, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
  .then(chuck_norris_random_joke => dispatch(addChuckNorrisRandomJoke(chuck_norris_random_joke)))
  .catch(error => dispatch(chuckNorrisRandomJokeFailed(error.message)));
}

/* Call action type from chuck norris random joke reducer */
export const chuckNorrisRandomJokeLoading = () => ({
  type: ActionTypes.CHUCK_NORRIS_RANDOM_JOKE_LOADING
});

/* Call action type from chuck norris random joke reducer */
export const chuckNorrisRandomJokeFailed = (errmess) => ({
  type: ActionTypes.CHUCK_NORRIS_RANDOM_JOKE_FAILED,
  payload: errmess
});

/* Call action type from chuck norris random joke reducer */
export const addChuckNorrisRandomJoke = (chuck_norris_random_joke) => ({
  type: ActionTypes.ADD_CHUCK_NORRIS_RANDOM_JOKE,
  payload: chuck_norris_random_joke
});

/* Request to Laravel API and show error or proceed to dispatch the data  */
export const fetchFavoriteJokes = () => (dispatch) => {

  dispatch(favoriteJokesLoading(true));

  return fetch(baseUrlApiRest + retrieve_user_favorite_jokes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => response.json())
  .then(favorite_jokes => dispatch(addFavoriteJokes(favorite_jokes)))
  .catch(error => dispatch(favoriteJokesFailed(error.message)));
}

/* Call action type from favorite jokes reducer */
export const favoriteJokesLoading = () => ({
    type: ActionTypes.FAVORITE_JOKES_LOADING
});

/* Call action type from favorite jokes reducer */
export const favoriteJokesFailed = (errmess) => ({
    type: ActionTypes.FAVORITE_JOKES_FAILED,
    payload: errmess
});

/* Call action type from favorite jokes reducer */
export const addFavoriteJokes = (favorite_jokes) => ({
    type: ActionTypes.ADD_FAVORITE_JOKES,
    payload: favorite_jokes
});

/**
 * Register Favorite joke
 */
 export const registerFavoriteJoke = (favorite_joke_data) => (dispatch) => {

  return fetch(baseUrlApiRest +  save_favorite_joke, {
      method: "POST",
      body: JSON.stringify(favorite_joke_data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    console.log('Register favorite joke', response); 
    alert('Favorite joke registered successfully!\n'); 
    /*window.location.reload(false);*/
    window.location.href = '/home'; 
  })
  /*.catch(error =>  { 
    console.log('Favorite joke', error.message); 
    alert('Favorite joke could not be registered\nError: '+error.message); 
  });*/
  .catch(error => dispatch(favoriteJokesFailed(error.message)));
};

/**
 * Login
 */
 export async function signInWithEmail(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  console.log(user);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}