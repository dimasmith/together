import {Map} from 'immutable';

import {PHOTO_MODE, THUMBNAILS_MODE} from '../../common/gallery.js';
import {SET_PHOTOS, SHOW_PHOTO, SHOW_THUMBNAILS, ADD_PHOTOS} from '../../common/constants/actionTypes.js';

function navigation(state = {index: 0, count: 0}, action = null) {
  switch (action.type) {
  case SET_PHOTOS:
    return new Map({index: 0, count: action.photos.length, viewMode: THUMBNAILS_MODE}).toObject();
  case ADD_PHOTOS:
    return new Map(state).update('count', 0, count => count + action.photos.length).toObject();
  case SHOW_PHOTO:
    return new Map(state).merge({index: action.index, viewMode: PHOTO_MODE}).toObject();
  case SHOW_THUMBNAILS:
    return new Map(state).merge({viewMode: THUMBNAILS_MODE}).toObject();

  default:
    return state;
  }
}

export default navigation;

