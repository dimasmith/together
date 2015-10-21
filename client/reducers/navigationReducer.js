import {Map} from 'immutable';

import {RECEIVE_PREVIEW, PREVIOUS_PHOTO, NEXT_PHOTO, SHOW_PHOTO, SHOW_THUMBNAILS, ADD_PHOTOS} from '../../common/constants/actionTypes.js';
import {PHOTO_MODE, THUMBNAILS_MODE} from '../../common/gallery.js';

const {min, max} = Math;

export default function navigationReducer(state = {
  fetching: false,
  index: 0,
  count: 0,
  viewMode: THUMBNAILS_MODE,
}, action = null) {
  const navigation = new Map(state);

  switch (action.type) {
  case RECEIVE_PREVIEW:
    return navigation
      .merge(action.preview.navigation)
      .toObject();

  case NEXT_PHOTO:
    return navigation
      .set('viewMode', PHOTO_MODE)
      .update('index', 0, index => min(index + 1, state.count - 1))
      .toObject();

  case PREVIOUS_PHOTO:
    return navigation
      .set('viewMode', PHOTO_MODE)
      .update('index', 0, index => max(index - 1, 0))
      .toObject();

  case SHOW_PHOTO:
    return navigation
      .merge({index: action.index, viewMode: PHOTO_MODE})
      .toObject();

  case SHOW_THUMBNAILS:
    return navigation
      .merge({viewMode: THUMBNAILS_MODE})
      .toObject();

  case ADD_PHOTOS:
    return navigation
      .update('count', 0, count => count + action.photos.length)
      .toObject();

  default:
    return navigation.toObject();
  }
}
