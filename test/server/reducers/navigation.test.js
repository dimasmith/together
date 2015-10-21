import {assert, expect} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';

import {PHOTO_MODE, THUMBNAILS_MODE} from '../../../common/gallery.js';
import {SET_PHOTOS, SHOW_PHOTO, SHOW_THUMBNAILS, ADD_PHOTOS} from '../../../common/constants/actionTypes.js';
import reduceNavigation from '../../../server/reducers/navigation.js';

describe('navigation reducer', () => {
  it('should handle initial state', () => {
    const expectedNavigation = {index: 0, count: 0};

    const actualNavigation = reduceNavigation(undefined, {});

    assert.deepEqual(actualNavigation, expectedNavigation);
  });

  it(`should handle ${SET_PHOTOS}`, () => {
    const expectedPhotosCount = 5;
    const photos = createExamplePhotos(expectedPhotosCount);
    const expectedNavigation = {index: 0, count: expectedPhotosCount, viewMode: THUMBNAILS_MODE};

    const actualNavigation = reduceNavigation({index: 4, count: 8},
      {type: SET_PHOTOS, photos});

    assert.deepEqual(actualNavigation, expectedNavigation);
  });

  it(`should handle ${ADD_PHOTOS}`, () => {
    const newPhotos = createExamplePhotos(3);
    const actualNavigation = reduceNavigation({index: 4, count: 5}, {type: ADD_PHOTOS, photos: newPhotos});

    expect(actualNavigation).to.eql({index: 4, count: 8});
  });

  it(`should handle ${SHOW_PHOTO}`, () => {
    const index = 3;
    const count = 5;
    const viewMode = PHOTO_MODE;

    const actualNavigation = reduceNavigation({index: 4, count: count},
      {type: SHOW_PHOTO, index: index});

    assert.deepEqual(actualNavigation, {index, count, viewMode});
  });

  it(`should handle ${SHOW_THUMBNAILS}`, () => {
    expect(reduceNavigation({viewMode: 'PHOTOS'}, {type: SHOW_THUMBNAILS})).to.eql({viewMode: THUMBNAILS_MODE});
  });
});
