import {assert} from 'chai';

import {REQUEST_PREVIEW, INITIALIZE_PREVIEW} from '../../common/previewProtocol.js';
import Client from '../../common/SyncClient.js';
import Server from '../../common/SyncServer.js';
import LocalTransport from './LocalTransport.js';

describe('Client-Server communication', () => {

  let transport = new LocalTransport();
  let client = new Client(transport);
  let server = new Server(transport);

  beforeEach(() => {
    transport = new LocalTransport();
    client = new Client(transport);
    server = new Server(transport);
  });

  describe('when client', () => {

    describe('requests library', () => {

      it(`onRequestGallery callback should be triggered on server`, (done) => {
        server.onRequestGallery(() => {
          done();
        });

        client.loadGallery();
      });
    });

    describe('switches current photo', () => {

      const expectedPhotoIndex = 42;
      const expectedIndexObject = {index: expectedPhotoIndex};

      it('onChangePhoto callback should be triggered on server', (done) => {
        server.onChangePhoto((photoIndex) => {
          assert.deepEqual(photoIndex, expectedIndexObject);
          done();
        });

        client.sendOpenPhoto(expectedPhotoIndex);
      });
    });

    describe('switches to thumbnails', () => {

      it('onShowThumbnails callback should be triggered on server', (done) => {
        server.onShowThumbnails(() => done());

        client.sendOpenThumbnails();
      });
    });
  });

  describe('when server', () => {

    describe('sends gallery', () => {

      const expectedGallery = {gallery: 'gallery'};

      it('client load gallery promise should be resolved with gallery data', (done) => {

        let galleryPromise = client.loadGallery();

        server.sendGallery(expectedGallery);

        galleryPromise
          .then((gallery) => assert.deepEqual(gallery, expectedGallery))
          .then(() => done())
          .catch((error) => done(error));
      });
    });

    describe('switches current photo', () => {

      const expectedPhotoIndex = 42;
      const expectedIndexObject = {index: expectedPhotoIndex};

      it('onShowPhoto callback should be triggered on client', (done) => {
        client.onShowPhoto((photoIndex) => {
          assert.deepEqual(photoIndex, expectedIndexObject);
          done();
        });

        server.sendOpenPhoto({navigation: expectedIndexObject});
      });
    });

    describe('switches to thumbnails', () => {

      it('onShowThumbnails callback should be triggered on client', (done) => {
        client.onShowThumbnails(() => done());

        server.sendOpenThumbnails();
      });
    });
  });
});
