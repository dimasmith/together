import {PHOTO_MODE, THUMBNAILS_MODE} from '../../common/gallery.js';
import {SET_PHOTOS, SHOW_PHOTO, SHOW_THUMBNAILS} from '../actions/actions.js';

function navigation(state = {index: 0, count: 0}, action = null) {
  switch (action.type) {
  case SET_PHOTOS:
    return Object.assign({}, state, {index: 0, count: action.photos.length, viewMode: THUMBNAILS_MODE});
  case SHOW_PHOTO:
    return Object.assign({}, state, {index: action.index, viewMode: PHOTO_MODE});
  case SHOW_THUMBNAILS:
    return Object.assign({}, state, {viewMode: THUMBNAILS_MODE});

  default:
    return state;
  }
}

export default navigation;

