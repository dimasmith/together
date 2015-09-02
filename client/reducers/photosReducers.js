/**
 * Initial application state and set of reducers
 */

import { combineReducers } from 'redux';

import { RECEIVE_PHOTOS, REQUEST_PHOTOS } from '../actions/photoActions.js';

function photos(state = {}, action = null) {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      return Object.assign({}, state, action.photos);

    default :
      return state;
  }
}

function photoNavigator(state = {
  fetching: false,
  currentPhoto: -1,
}, action = null) {
  switch (action.type) {
    case REQUEST_PHOTOS:
      return Object.assign({}, state, {fetching: true});
    case RECEIVE_PHOTOS:
      return Object.assign({}, state, {fetching: false, updatedAt: new Date(), currentPhoto: 1});

    default :
      return state;
  }
}

const rootReducer = combineReducers({
  photos,
  photoNavigator,
});

export default rootReducer;
