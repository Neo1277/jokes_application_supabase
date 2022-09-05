import * as ActionTypes from './ActionTypes';

/* Set reducer to handle redux state */
export const FavoriteJokes = (state = { 
    isLoading: true,
    errMess: null,
    favorite_jokes:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE_JOKES:
            return {...state, isLoading: false, errMess: null, favorite_jokes: action.payload};

        case ActionTypes.FAVORITE_JOKES_LOADING:
            return {...state, isLoading: true, errMess: null, favorite_jokes: []}

        case ActionTypes.FAVORITE_JOKES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};