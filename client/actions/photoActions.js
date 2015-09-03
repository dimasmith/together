/**
 * Application actions and action creators
 */
export const RECEIVE_PREVIEW = 'RECEIVE_PREVIEW';
export function receivePreview(photos, index) {
  return {
    type: RECEIVE_PREVIEW,
    photos,
    index,
  };
}

export const NEXT_PHOTO = 'NEXT_PHOTO';
export function showNextPhoto() {
  return {
    type: NEXT_PHOTO,
  };
}

export const PREVIOUS_PHOTO = 'PREVIOUS_PHOTO';
export function showPreviousPhoto() {
  return {
    type: PREVIOUS_PHOTO,
  };
}

export const SHOW_PHOTO = 'SHOW_PHOTO';
export function showPhoto(index) {
  return {
    type: SHOW_PHOTO,
    index,
  };
}
