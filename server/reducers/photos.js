import {List} from 'immutable';

import {SET_PHOTOS, ADD_PHOTOS} from '../../common/constants/actionTypes.js';

function photos(state = [], action = null) {
  switch (action.type) {
  case SET_PHOTOS:
    return action.photos;

  case ADD_PHOTOS:
    return new List(state).concat(action.photos).toArray();

  default:
    return state;
  }
}

export default photos;

