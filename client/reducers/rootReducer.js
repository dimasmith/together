import {combineReducers} from 'redux';

import photos from './photosReducer.js';
import navigation from './navigationReducer.js';

export default combineReducers({
  photos,
  navigation,
});
