/**
 * Loads bunch of photos from loremimage service
 */

class LoremImageLoader {

  constructor(config) {
    this.config = config;
  }

  loadPhotos() {
    return [
      {url: 'http://lorempixel.com/800/600/abstract', date: new Date()},
      {url: 'http://lorempixel.com/800/600/animals', date: new Date()},
      {url: 'http://lorempixel.com/800/600/business', date: new Date()},
      {url: 'http://lorempixel.com/800/600/cats', date: new Date()},
      {url: 'http://lorempixel.com/800/600/city', date: new Date()},
      {url: 'http://lorempixel.com/800/600/food', date: new Date()},
      {url: 'http://lorempixel.com/800/600/nightlife', date: new Date()},
      {url: 'http://lorempixel.com/800/600/fashion', date: new Date()},
      {url: 'http://lorempixel.com/800/600/people', date: new Date()},
      {url: 'http://lorempixel.com/800/600/nature', date: new Date()},
      {url: 'http://lorempixel.com/800/600/sports', date: new Date()},
      {url: 'http://lorempixel.com/800/600/technics', date: new Date()},
      {url: 'http://lorempixel.com/800/600/transport', date: new Date()},
    ];
  }
}

export default LoremImageLoader;
