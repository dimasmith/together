import {assert} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';

import {SET_PHOTOS, ADD_PHOTOS} from '../../../common/constants/actionTypes.js';
import photos from '../../../server/reducers/photos.js';

describe('photos reducer', () => {
  it('should handle initial state', () => {
    const expectedPhotos = [];

    const actualPhotos = photos(undefined, {});

    assert.deepEqual(actualPhotos, expectedPhotos);
  });

  it(`should handle ${SET_PHOTOS}`, () => {
    const expectedPhotos = createExamplePhotos(5);

    const actualPhotos = photos([], {type: SET_PHOTOS, photos: expectedPhotos});

    assert.deepEqual(actualPhotos, expectedPhotos);
  });

  it(`should handle ${ADD_PHOTOS}`, () => {
    const existingPhotos = createExamplePhotos(5);
    const newPhotos = createExamplePhotos(3);

    const actualPhotos = photos(existingPhotos, {type: ADD_PHOTOS, photos: newPhotos});

    assert.deepEqual(actualPhotos, existingPhotos.concat(newPhotos));
  });
});
