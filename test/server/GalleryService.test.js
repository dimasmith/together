import {assert} from 'chai';
import {PHOTO_MODE, THUMBNAILS_MODE} from '../../common/gallery.js';
import {createExamplePhotos} from '../util/examplePhotos.js';
import GalleryService from '../../server/GalleryService.js';
import configureStore from '../../server/store/configureStore.js';

const initialState = {
  photos: createExamplePhotos(5),
  navigation: {
    index: 0,
    count: 5,
  },
};

describe('GalleryService', () => {
  let service;

  beforeEach(() => {
    service = new GalleryService(configureStore(initialState));
  });

  it('should return plain gallery object on #getState()', () => {
    const state = service.getState();

    assert.equal(typeof state, 'object', 'state should be plain object');
  });

  it('should reset navigation and calculate count on setting photos', () => {
    const expectedPhotosCount = 10;
    const expectedPhotos = createExamplePhotos(expectedPhotosCount);
    const expectedPhotoIndex = 0;

    const state = service.setPhotos(expectedPhotos);

    assert.deepEqual(state.photos, expectedPhotos);
    assert.equal(state.navigation.index, expectedPhotoIndex);
    assert.equal(state.navigation.count, expectedPhotosCount);
  });

  it('should set index and photo view mode when showing photo', () => {
    const expectedPhotoIndex = 3;

    const state = service.showPhoto(expectedPhotoIndex);

    assert.equal(state.navigation.index, expectedPhotoIndex);
    assert.equal(state.navigation.viewMode, PHOTO_MODE);
  });

  it('should change view mode to thumbnails when showing thumbnails', () => {
    service.showPhoto(1); // opening photo so gallery does not stay in initial thumbnails view

    const state = service.showThumbnails();

    assert.equal(state.navigation.viewMode, THUMBNAILS_MODE);
  });
})
;
