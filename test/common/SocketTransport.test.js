import {assert} from 'chai';
import sinon from 'sinon';

import SocketTransport from '../../common/SocketTransport.js';

const serializer = {
  serialize() {
  },

  parse() {
  },
};

const socket = {
  emit() {
  },

  on(action, cb) {
    this._cb = cb;
  },

  fakeTrigger(payload) {
    this._cb(payload);
  },

  broadcast: {
    emit() {
    },
  },
};


describe('SocketTransport', () => {
  const ANY_ACTION = 'ANY_ACTION';
  const payload = {some: 'payload'};

  describe('should serialize payload', () => {
    let transport;
    let serialize;

    beforeEach(() => {
      serialize = sinon.stub(serializer, 'serialize');
      transport = new SocketTransport(socket, serializer);
    });

    afterEach(() => {
      serialize.restore();
    });

    it('when send data', () => {
      transport.send(ANY_ACTION, payload);

      assert.isTrue(serialize.calledOnce, 'serialize should be called');
      assert.isTrue(serialize.lastCall.calledWith(payload), 'payload should be passed to serialize');
    });

    it('when broadcast data', () => {
      transport.broadcast(ANY_ACTION, payload);

      assert.isTrue(serialize.calledOnce, 'serialize should be called');
      assert.isTrue(serialize.lastCall.calledWith(payload), 'payload should be passed to serialize');
    });
  });

  describe('should parse payload', () => {
    let transport;
    let parse;

    beforeEach(() => {
      parse = sinon.stub(serializer, 'parse');
      transport = new SocketTransport(socket, serializer);
    });

    afterEach(() => {
      parse.restore();
    });

    it('when invoke event listener', (done) => {
      const payloadString = JSON.stringify(payload);

      transport.on(ANY_ACTION, () => {
        assert.isTrue(parse.calledOnce, 'transport must parse payload before sending to callback');
        assert.isTrue(parse.lastCall.calledWith(payloadString), 'payload string should be passed as parameter to parse');
        done();
      });

      socket.fakeTrigger(payloadString);
    });
  });
});
