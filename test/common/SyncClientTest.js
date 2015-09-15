import {assert} from 'chai';
import sinon from 'sinon';

import * as Protocol from '../../common/synchronizationProtocol.js';
import SyncClient from '../../common/SyncClient.js';
import Transport from '../../common/Transport.js';

describe('Gallery SyncClient', () => {

  let transport = new Transport();
  let syncClient;

  beforeEach(() => {
    transport = new Transport();
    syncClient = new SyncClient(transport);
  });

  describe('when opening thumbnails', () => {

    beforeEach(() => sinon.stub(transport, 'send'));
    afterEach(() =>  transport.send.restore());

    it(`should send ${Protocol.SHOW_THUMBNAILS} message`, () => {
      syncClient.sendShowThumbnails();

      assert(transport.send.calledOnce);
      assert.deepEqual(transport.send.lastCall.args, [Protocol.SHOW_THUMBNAILS], 'wrong arguments passed');
    });
  });

  describe('when opening photo', () => {

    beforeEach(() => sinon.stub(transport, 'send'));
    afterEach(() =>  transport.send.restore());

    it(`should send ${Protocol.SHOW_PHOTO} message`, () => {
      let payload = {index: 1};
      syncClient.sendShowPhoto(payload.index);

      assert(transport.send.calledOnce);
      assert.deepEqual(transport.send.lastCall.args, [Protocol.SHOW_PHOTO, payload], 'wrong arguments passed');
    });
  });

  describe('when requesting gallery', () => {

    beforeEach(() => {
      sinon.stub(transport, 'send');
      sinon.stub(transport, 'on');
    });

    afterEach(() =>  {
      transport.send.restore();
      transport.on.restore();
    });

    it(`should send ${Protocol.REQUEST_GALLERY} message`, () => {
      syncClient.loadGallery();

      assert(transport.send.calledOnce);
      assert.deepEqual(transport.send.lastCall.args, [Protocol.REQUEST_GALLERY], 'wrong arguments passed');
    });

    it(`should return gallery data in promise`, (done) => {
      let expectedData = {data: 0};
      transport.on.callsArgWith(1, expectedData);
      let promise = syncClient.loadGallery();

      promise
        .then((data) => assert.deepEqual(data, expectedData))
        .then(() => done());
    });
  });

});
