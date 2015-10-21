import {expect} from 'chai';
import sinon from 'sinon';

import {SHOW_PHOTO} from '../../common/constants/actionTypes.js';
import {switchPhoto} from '../../server/commands/commands.js';

describe('commands', () => {
  describe(`switch photo command`, () => {
    it(`should create ${SHOW_PHOTO} action`, () => {
      const index = 3;
      const dispatch = sinon.spy();
      const getState = () => ({navigation: {count: 5}});
      const fn = switchPhoto(index);
      fn(dispatch, getState);
      expect(dispatch.lastCall.args[0]).to.eql({type: SHOW_PHOTO, index});
    });

    it('should accept object with index property argument', () => {
      const index = 3;
      const navigation = {index};
      const dispatch = sinon.spy();
      const getState = () => ({navigation: {count: 5}});
      const fn = switchPhoto(navigation);
      fn(dispatch, getState);
      expect(dispatch.lastCall.args[0]).to.eql({type: SHOW_PHOTO, index});
    });

    it(`should not create ${SHOW_PHOTO} action when index is less then 0`, () => {
      const index = -1;
      const dispatch = sinon.spy();
      const getState = () => ({navigation: {count: 5}});
      const fn = switchPhoto(index);
      fn(dispatch, getState);
      expect(dispatch.callCount).to.eql(0);
    });

    it(`should not create ${SHOW_PHOTO} action when index is more than count`, () => {
      const index = 5;
      const dispatch = sinon.spy();
      const getState = () => ({navigation: {count: 5}});
      const fn = switchPhoto(index);
      fn(dispatch, getState);
      expect(dispatch.callCount).to.eql(0);
    });
  });
});
