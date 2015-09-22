import {assert, expect} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';

import {PHOTO_MODE, THUMBNAILS_MODE} from '../../../common/gallery.js';
import {SET_PHOTOS, SHOW_PHOTO, SHOW_THUMBNAILS} from '../../../server/actions/actions.js';
import navigation from '../../../server/reducers/navigation.js';

describe('navigation reducer', () => {
  it('should handle initial state', () => {
    const expectedNavigation = {index: 0, count: 0};

    const actualNavigation = navigation(undefined, {});

    assert.deepEqual(actualNavigation, expectedNavigation);
  });

  it(`should handle ${SET_PHOTOS}`, () => {
    const expectedPhotosCount = 5;
    const photos = createExamplePhotos(expectedPhotosCount);
    const expectedNavigation = {index: 0, count: expectedPhotosCount, viewMode: THUMBNAILS_MODE};

    const actualNavigation = navigation({index: 4, count: 8},
      {type: SET_PHOTOS, photos});

    assert.deepEqual(actualNavigation, expectedNavigation);
  });

  it(`should handle ${SHOW_PHOTO}`, () => {
    const index = 3;
    const count = 5;
    const viewMode = PHOTO_MODE;

    const actualNavigation = navigation({index: 4, count: count},
      {type: SHOW_PHOTO, index: index});

    assert.deepEqual(actualNavigation, {index, count, viewMode});
  });

  it(`should handle ${SHOW_THUMBNAILS}`, () => {
    expect(navigation({viewMode: 'PHOTOS'}, {type: SHOW_THUMBNAILS})).to.eql({viewMode: THUMBNAILS_MODE});
  });
});
