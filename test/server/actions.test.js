import {assert, expect} from 'chai';
import {createExamplePhotos} from '../util/examplePhotos.js';
import {showPhoto, setPhotos, showThumbnails, addPhotos} from '../../server/actions/actions.js';
import {SHOW_PHOTO, SET_PHOTOS, SHOW_THUMBNAILS, ADD_PHOTOS} from '../../common/constants/actionTypes.js';

describe('Actions', () => {
  describe('show photo action', () => {
    it(`should create ${SHOW_PHOTO} action`, () => {
      const index = 2;
      expect(showPhoto(index)).to.eql({type: SHOW_PHOTO, index});
    });

    it('should accept numeric argument', () => {
      const expectedIndex = 5;

      const action = showPhoto(expectedIndex);

      assert.equal(action.index, expectedIndex);
    });
    it('should accept object with index property argument', () => {
      const expectedIndex = 5;
      const indexObject = {index: expectedIndex};

      const action = showPhoto(indexObject);

      assert.equal(action.index, expectedIndex);
    });
    it('should not accept other argument types', (done) => {
      const invalidIndex = 'invalidIndex';

      try {
        showPhoto(invalidIndex);
      } catch (err) {
        done();
      }
    });
  });

  describe('set photos action', () => {
    it(`should create ${SET_PHOTOS} action`, () => {
      const photos = createExamplePhotos(2);
      expect(setPhotos(photos)).to.eql({type: SET_PHOTOS, photos});
    });

    it('should pass photos in photos property', () => {
      const expectedPhotos = createExamplePhotos(5);

      const action = setPhotos(expectedPhotos);

      assert.deepEqual(action.photos, expectedPhotos);
    });
  });

  describe('show thumbnails action', () => {
    it(`should create ${SHOW_THUMBNAILS} action`, () => {
      expect(showThumbnails()).to.eql({type: SHOW_THUMBNAILS});
    });
  });

  describe('add photos action', () => {
    it(`should create ${ADD_PHOTOS} action`, () => {
      const photos = createExamplePhotos(3);
      const action = addPhotos(photos);

      expect(action).to.eql({type: ADD_PHOTOS, photos});
    });
  });
});
