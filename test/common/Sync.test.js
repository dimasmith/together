import {assert, expect} from 'chai';

import Client from '../../common/SyncClient.js';
import Server from '../../common/SyncServer.js';
import LocalTransport from './LocalTransport.js';

describe('Client-Server communication', () => {
  let transport;
  let client;
  let server;

  beforeEach(() => {
    transport = new LocalTransport();
    client = new Client(transport);
    server = new Server(transport);
  });

  describe('when client', () => {
    describe('requests gallery', () => {
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

      it('onShowPhoto callback should be triggered on server', (done) => {
        server.onShowPhoto((photoIndex) => {
          assert.deepEqual(photoIndex, expectedIndexObject);
          done();
        });

        client.sendShowPhoto(expectedIndexObject);
      });
    });

    describe('switches to thumbnails', () => {
      it('onShowThumbnails callback should be triggered on server', (done) => {
        server.onShowThumbnails(() => done());

        client.sendShowThumbnails();
      });
    });

    describe('add photos to display', () => {
      it('onAddPhotos callback triggered on server', (done) => {
        const newPhotos = [{url: 'http://photos.com/1.jpg'}, {url: 'http://photos.com/2.jpg'}];
        server.onAddPhotos((photos) => {
          expect(photos).to.eql(newPhotos);
          done();
        });

        client.sendAddPhotos(newPhotos);
      });
    });
  });

  describe('when server', () => {
    describe('sends gallery', () => {
      const expectedGallery = {gallery: 'gallery'};

      it('client load gallery promise should be resolved with gallery data', (done) => {
        const galleryPromise = client.loadGallery();

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

        server.sendShowPhoto(expectedIndexObject);
      });
    });

    describe('switches to thumbnails', () => {
      it('onShowThumbnails callback should be triggered on client', (done) => {
        client.onShowThumbnails(() => done());

        server.sendShowThumbnails();
      });
    });

    describe('add photos to show', () => {
      it('onAddPhotos callback invoked on client', () => {
        const newPhotos = [{url: 'http://photos.com/1.jpg'}, {url: 'http://photos.com/2.jpg'}];
        client.onAddPhotos((photos) => {
          expect(photos).to.eql(newPhotos);
          done();
        });

        server.sendAddPhotos(newPhotos);
      });
    });
  });
});
