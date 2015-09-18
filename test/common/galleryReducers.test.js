import {expect} from 'chai';
import * as Gallery from '../../common/gallery.js';

function createExamplePhoto(index) {
  const url = `http://examplephotos/${index}.png`;
  return {url};
}

function createExamplePhotos(amount) {
  return new Array(amount)
    .map((item, index) => createExamplePhoto(index));
}

console.log(createExamplePhotos(2));

describe('Gallery reducers', () => {
  let initialGallery;

  beforeEach('Initialize gallery', () => {
    initialGallery = Gallery.createPreview();
  });

  describe('when setting photos', () => {
    const photos = createExamplePhotos(2);

    it('should add photos array', () => {
      const gallery = Gallery.setPhotos(initialGallery, photos);

      expect(gallery.photos).to.eql(photos);
    });

    it('should reset navigation', () => {
      const navigation = Gallery.setPhotos(initialGallery, photos).navigation;

      expect(navigation.index).to.be.equal(0, 'index must be reset to 0'); // navigation reset to 0
      expect(navigation.count).to.be.equal(photos.length, 'count must be set to photos count');
    });
  });

  describe('when change current photo index', () => {
    const photos = createExamplePhotos(5);
    const galleryWithPhotos = Gallery.setPhotos(Gallery.createPreview(), photos);

    it('should set index to given value', () => {
      const expectedIndex = 3;
      const index = Gallery.setCurrentPhotoIndex(galleryWithPhotos, expectedIndex).navigation.index;

      expect(index).to.equal(expectedIndex);
    });

    it(`should change view mode to ${Gallery.PHOTO_MODE}`, () => {
      const expectedIndex = 3;
      const viewMode = Gallery.setCurrentPhotoIndex(galleryWithPhotos, expectedIndex).navigation.viewMode;

      expect(viewMode).to.equal(Gallery.PHOTO_MODE);
    });

    it('should leave index unchanged when new index is below 0', () => {
      const expectedIndex = -1;
      const index = Gallery.setCurrentPhotoIndex(galleryWithPhotos, expectedIndex).navigation.index;

      expect(index).to.equal(galleryWithPhotos.navigation.index);
    });

    it('should leave index unchanged when new index is bigger than count', () => {
      const expectedIndex = 10;
      const index = Gallery.setCurrentPhotoIndex(galleryWithPhotos, expectedIndex).navigation.index;

      expect(index).to.equal(galleryWithPhotos.navigation.index);
    });
  });

  describe('when change view mode', () => {
    it('should switch to provided mode', () => {
      const expectedMode = Gallery.THUMBNAILS_MODE;
      const gallery = Gallery.setViewMode(initialGallery, expectedMode);

      expect(gallery.navigation.viewMode).to.equal(expectedMode);
    });

    it('should leave mode unchanged when switching to unsupported mode', () => {
      const unsupportedMode = 'SOME_OTHER_MODE';
      const expectedMode = initialGallery.navigation.viewMode;
      const gallery = Gallery.setViewMode(initialGallery, unsupportedMode);

      expect(gallery.navigation.viewMode).to.equal(expectedMode);
    });
  });
});
