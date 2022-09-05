import {createStore, combineReducers, applyMiddleware} from 'redux';
import { ChuckNorrisRandomJoke } from './chuck_norris_random_joke';
import { FavoriteJokes } from './favorite_jokes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

/* Configure store for letting the data be there even if the page is reloaded */
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            chuck_norris_random_joke: ChuckNorrisRandomJoke,
            favorite_jokes: FavoriteJokes
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}