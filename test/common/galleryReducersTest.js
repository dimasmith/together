import {expect} from 'chai';
import * as Gallery from '../../common/preview.js';

describe('Gallery reducers', () => {

  let initialGallery;

  beforeEach('Initialize gallery', () => {
    initialGallery = Gallery.createPreview();
  });

  describe('when setting photos', () => {
    const photos = [{url: 'url'}, {url: 'url2'}];

    it('should add photos array', () => {
      let gallery = Gallery.setPhotos(initialGallery, photos);

      expect(gallery.photos).to.eql(photos);
    });

    it('should reset navigation', () => {
      let navigation = Gallery.setPhotos(initialGallery, photos).navigation;

      expect(navigation.index).to.be.equal(0, 'index must be reset to 0'); // navigation reset to 0
      expect(navigation.count).to.be.equal(photos.length, 'count must be set to photos count');
    });
  });

  describe('when change current photo index', () => {

    const photos = [{url: '1'},{url: '2'},{url: '3'},{url: '4'},{url: '5'}];
    let initialGallery = Gallery.setPhotos(Gallery.createPreview(), photos);

    it('should set index to given value', () => {
      let expectedIndex = 3;
      let index = Gallery.setCurrentPhotoIndex(initialGallery, expectedIndex).navigation.index;

      expect(index).to.equal(expectedIndex);
    });

    it(`should change view mode to ${Gallery.PHOTO_MODE}`, () => {
      let expectedIndex = 3;
      let viewMode = Gallery.setCurrentPhotoIndex(initialGallery, expectedIndex).navigation.viewMode;

      expect(viewMode).to.equal(Gallery.PHOTO_MODE);
    });

    it('should leave index unchanged when new index is below 0', () => {
      let expectedIndex = -1;
      let index = Gallery.setCurrentPhotoIndex(initialGallery, expectedIndex).navigation.index;

      expect(index).to.equal(initialGallery.navigation.index);
    });

    it('should leave index unchanged when new index is bigger than count', () => {
      let expectedIndex = 10;
      let index = Gallery.setCurrentPhotoIndex(initialGallery, expectedIndex).navigation.index;

      expect(index).to.equal(initialGallery.navigation.index);
    });
  });

  describe('when change view mode', () => {

    const initialGallery = Gallery.createPreview();

    it('should switch to provided mode', () => {
      let expectedMode = Gallery.THUMBNAILS_MODE;
      let gallery = Gallery.setViewMode(initialGallery, expectedMode);

      expect(gallery.navigation.viewMode).to.equal(expectedMode);
    });

    it('should leave mode unchanged when switching to unsupported mode', () => {
      let unsupportedMode = 'SOME_OTHER_MODE';
      let expectedMode = initialGallery.navigation.viewMode;
      let gallery = Gallery.setViewMode(initialGallery, unsupportedMode);

      expect(gallery.navigation.viewMode).to.equal(expectedMode);
    });
  });
});
