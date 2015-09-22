import {SET_PHOTOS} from '../actions/actions.js';

function photos(state = [], action = null) {
  switch (action.type) {
  case SET_PHOTOS:
    return action.photos;

  default:
    return state;
  }
}

export default photos;

