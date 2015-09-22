import {showPhoto} from '../actions/actions.js';
import {extractIndex} from '../util/actionUtils.js';

/**
 * Switch state to index photo if possible
 * @param {object:number} navigation navigation object with index property of numeric photo index
 */
export function switchPhoto(navigation) {
  const index = extractIndex(navigation);

  return (dispatch, getState) => {
    if (index < 0) {
      return;
    }

    const count = getState().navigation.count;
    if (index > (count - 1)) {
      return;
    }

    dispatch(showPhoto(index));
  };
}
