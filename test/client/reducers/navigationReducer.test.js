import {expect} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';
import {addPhotos, receiveGallery, showNextPhoto, showPreviousPhoto} from '../../../client/actions/galleryActions.js';
import {ADD_PHOTOS, RECEIVE_PREVIEW, NEXT_PHOTO, PREVIOUS_PHOTO} from '../../../common/constants/actionTypes.js';
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

  it(`handles ${NEXT_PHOTO}`, () => {
    const state = reducer({index: 1, count: 3}, showNextPhoto());

    expect(state).to.eql({index: 2, count: 3, viewMode: PHOTO_MODE});
  });

  it(`rejects ${NEXT_PHOTO} when last photo is shown`, () => {
    const state = reducer({index: 2, count: 3}, showNextPhoto());

    expect(state).to.eql({index: 2, count: 3, viewMode: PHOTO_MODE});
  });

  it(`handles ${PREVIOUS_PHOTO}`, () => {
    const state = reducer({index: 1, count: 3}, showPreviousPhoto());

    expect(state).to.eql({index: 0, count: 3, viewMode: PHOTO_MODE});
  });

  it(`rejects ${PREVIOUS_PHOTO} when first photo is shown`, () => {
    const state = reducer({index: 0, count: 3}, showPreviousPhoto());

    expect(state).to.eql({index: 0, count: 3, viewMode: PHOTO_MODE});
  });
});
