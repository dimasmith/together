import {expect} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';
import {addPhotos, receiveGallery} from '../../../client/actions/galleryActions.js';
import {ADD_PHOTOS, RECEIVE_PREVIEW} from '../../../common/constants/actionTypes.js';
import {PHOTO_MODE} from '../../../common/gallery.js';
import reducer from '../../../client/reducers/navigationReducer.js';

describe('Client navigation reducer', () => {
  it(`handles ${ADD_PHOTOS}`, () => {
    const newPhotos = createExamplePhotos(2);
    const state = reducer({index: 1, count: 2}, addPhotos(newPhotos));

    expect(state).to.be.array;
    expect(state).to.deep.equal({index: 1, count: 4});
  });

  it(`handles ${RECEIVE_PREVIEW}`, () => {
    const state = reducer(undefined, receiveGallery({
      photos: [{url: 'example1'}],
      navigation: {index: 1, count: 2, viewMode: PHOTO_MODE},
    }));

    expect(state).to.eql({index: 1, count: 2, viewMode: PHOTO_MODE, fetching: false});
  });
});
