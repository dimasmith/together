/**
 * Initial application state and set of reducers
 */

import { combineReducers } from 'redux';

import { RECEIVE_PREVIEW, PREVIOUS_PHOTO, NEXT_PHOTO, SHOW_PHOTO } from '../actions/photoActions.js';

function photos(state = [], action = null) {
  switch (action.type) {
    case RECEIVE_PREVIEW:
      return action.photos;

    default :
      return state;
  }
}

function photoNavigator(state = {
  fetching: false,
  currentPhoto: 0,
  count: 0,
}, action = null) {
  switch (action.type) {
    case RECEIVE_PREVIEW:
      return Object.assign({}, state, {
        fetching: false,
        updatedAt: new Date(),
        currentPhoto: action.index,
        count: action.photos.length,
      });
    case NEXT_PHOTO:
      let nextIndex = Math.min(state.currentPhoto + 1, state.count - 1);
      return Object.assign({}, state, {currentPhoto: nextIndex});

    case PREVIOUS_PHOTO:
      let previousIndex = Math.max(state.currentPhoto - 1, 0);
      return Object.assign({}, state, {currentPhoto: previousIndex});

    case SHOW_PHOTO:
      return Object.assign({}, state, {currentPhoto: action.index});

    default :
      return state;
  }
}

const rootReducer = combineReducers({
  photos,
  photoNavigator,
});

export default rootReducer;
