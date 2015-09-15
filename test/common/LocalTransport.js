import Transport from '../../common/Transport.js';

function async(func) {
  setTimeout(func, 0);
}

class LocalTransport extends Transport {

  constructor() {
    super();
    this.listeners = {};
  }

  send(action, payload) {
    this.notify(action, payload);
  }

  broadcast(action, payload) {
    this.notify(action, payload);
  }

  on(action, callback) {
    if (!this.listeners[action]) {
      this.listeners[action] = [];
    }

    this.listeners[action].push(callback);
  }

  notify(action, payload) {
    if (this.listeners[action]) {
      async(() => this.listeners[action].forEach((callback) => callback(payload)));
    }
  }
}

export default LocalTransport;
