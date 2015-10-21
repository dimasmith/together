import {expect} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';
import {addPhotos} from '../../../client/actions/galleryActions.js';
import {ADD_PHOTOS, RECEIVE_PREVIEW} from '../../../common/constants/actionTypes.js';
import reducer from '../../../client/reducers/photosReducer.js';

describe('Client photos reducer', () => {
  it('handles initial state', () => {
    const state = reducer(undefined, {});

    expect(state).to.be.array;
    expect(state).to.be.empty;
  });

  it(`handles ${RECEIVE_PREVIEW}`, () => {
    const expectedPhotos = createExamplePhotos(2);
    const state = reducer(undefined, {type: RECEIVE_PREVIEW, preview: {
      photos: expectedPhotos,
    }});

    expect(state).to.be.array;
    expect(state).to.deep.equal(expectedPhotos);
  });

  it(`handles ${ADD_PHOTOS}`, () => {
    const existingPhotos = createExamplePhotos(2);
    const newPhotos = [{url: 'new1'}, {url: 'new2'}];
    const state = reducer(existingPhotos, addPhotos(newPhotos));

    expect(state).to.be.array;
    expect(state).to.deep.equal(existingPhotos.concat(newPhotos));
  });
});
