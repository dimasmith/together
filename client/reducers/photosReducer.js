import {List} from 'immutable';
import {ADD_PHOTOS, RECEIVE_PREVIEW} from '../../common/constants/actionTypes.js';

export default function photosReducer(state = [], action = null) {
  const photos = new List(state);
  switch (action.type) {
  case RECEIVE_PREVIEW:
    return new List(action.preview.photos).toArray();

  case ADD_PHOTOS:
    return photos.concat(action.photos).toArray();

  default :
    return photos.toArray();
  }
}
