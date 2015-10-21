import {Map} from 'immutable';

import {RECEIVE_PREVIEW, PREVIOUS_PHOTO, NEXT_PHOTO, SHOW_PHOTO, SHOW_THUMBNAILS, ADD_PHOTOS} from '../../common/constants/actionTypes.js';
import {PHOTO_MODE, THUMBNAILS_MODE} from '../../common/gallery.js';

export default function navigationReducer(state = {
  fetching: false,
  index: 0,
  count: 0,
  viewMode: THUMBNAILS_MODE,
}, action = null) {
  const navigation = new Map(state);

  switch (action.type) {
  case RECEIVE_PREVIEW:
    return new Map(state).merge(action.preview.navigation).toObject();

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

  case ADD_PHOTOS:
    return navigation.update('count', 0, count => count + action.photos.length).toObject();

  default :
    return state;
  }
}
