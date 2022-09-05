import * as ActionTypes from './ActionTypes';

/* Set reducer to handle redux state */
export const ChuckNorrisRandomJoke = (state = { 
    isLoading: true,
    errMess: null,
    chuck_norris_random_joke:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CHUCK_NORRIS_RANDOM_JOKE:
            return {...state, isLoading: false, errMess: null, chuck_norris_random_joke: action.payload};

        case ActionTypes.CHUCK_NORRIS_RANDOM_JOKE_LOADING:
            return {...state, isLoading: true, errMess: null, chuck_norris_random_joke: []}

        case ActionTypes.CHUCK_NORRIS_RANDOM_JOKE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};