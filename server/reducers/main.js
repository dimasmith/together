import {combineReducers} from 'redux';

import photos from './photos.js';
import navigation from './navigation.js';

export default combineReducers({
  photos,
  navigation,
});

