/**
 * Initial application state and set of reducers
 */

import {combineReducers} from 'redux';

import {RECEIVE_PREVIEW, PREVIOUS_PHOTO, NEXT_PHOTO, SHOW_PHOTO, SHOW_THUMBNAILS} from '../actions/galleryActions.js';
import {PHOTO_MODE, THUMBNAILS_MODE} from '../../common/gallery.js';

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
  viewMode: THUMBNAILS_MODE,
}, action = null) {
  switch (action.type) {
  case RECEIVE_PREVIEW:
    return Object.assign({}, state,
      action.preview.navigation,
      {fetching: false}
    );
  case NEXT_PHOTO:
    const nextIndex = Math.min(state.index + 1, state.count - 1);
    return Object.assign({}, state, {index: nextIndex, viewMode: PHOTO_MODE});

  case PREVIOUS_PHOTO:
    const previousIndex = Math.max(state.index - 1, 0);
    return Object.assign({}, state, {index: previousIndex, viewMode: PHOTO_MODE});

  case SHOW_PHOTO:
    return Object.assign({}, state, {index: action.index, viewMode: PHOTO_MODE});

  case SHOW_THUMBNAILS:
    return Object.assign({}, state, {viewMode: THUMBNAILS_MODE});

  default :
    return state;
  }
}

const rootReducer = combineReducers({
  photos,
  navigation,
});

export default rootReducer;
