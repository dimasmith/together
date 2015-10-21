import {expect} from 'chai';

import {createExamplePhotos} from '../../util/examplePhotos.js';
import {addPhotos} from '../../../client/actions/galleryActions.js';
import {ADD_PHOTOS} from '../../../common/constants/actionTypes.js';
import reducer from '../../../client/reducers/navigationReducer.js';

describe('Client navigation reducer', () => {
  it(`handles ${ADD_PHOTOS}`, () => {
    const newPhotos = createExamplePhotos(2);
    const state = reducer({index: 1, count: 2}, addPhotos(newPhotos));

    expect(state).to.be.array;
    expect(state).to.deep.equal({index: 1, count: 4});
  });
});
