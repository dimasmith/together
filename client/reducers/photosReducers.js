/**
 * Initial application state and set of reducers
 */

import { combineReducers } from 'redux';

import { RECEIVE_PREVIEW, PREVIOUS_PHOTO, NEXT_PHOTO, SHOW_PHOTO } from '../actions/photoActions.js';
import {SHOW_THUMBNAILS} from '../actions/navigationActions.js';

function photos(state = [], action = null) {
  switch (action.type) {
    case RECEIVE_PREVIEW:
      return action.preview.photos;

    default :
      return state;
  }
}

function navigation(state = {
  fetching: false,
  index: 0,
  count: 0,
  viewMode: 'THUMBNAILS',
}, action = null) {
  switch (action.type) {
    case RECEIVE_PREVIEW:
      return Object.assign({}, state,
        action.preview.navigation,
        { fetching: false }
      );
    case NEXT_PHOTO:
      let nextIndex = Math.min(state.index + 1, state.count - 1);
      return Object.assign({}, state, {index: nextIndex, viewMode: 'PHOTO'});

    case PREVIOUS_PHOTO:
      let previousIndex = Math.max(state.index - 1, 0);
      return Object.assign({}, state, {index: previousIndex, viewMode: 'PHOTO'});

    case SHOW_PHOTO:
      return Object.assign({}, state, {index: action. index, viewMode: 'PHOTO'});

    case SHOW_THUMBNAILS:
      return Object.assign({}, state, {viewMode: 'THUMBNAILS'});

    default :
      return state;
  }
}

const rootReducer = combineReducers({
  photos,
  navigation,
});

export default rootReducer;
