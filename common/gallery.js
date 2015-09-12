export const THUMBNAILS_MODE = 'THUMBNAILS';
export const PHOTO_MODE = 'PHOTO';

const modes = [
  THUMBNAILS_MODE,
  PHOTO_MODE,
];

const initialGallery = {
  photos: [],
  navigation: {
    index: 0,
    count: 0,
    viewMode: THUMBNAILS_MODE,
  },
  updatedAt: new Date(),
};

function extendGallery(initialGallery, gallery = {}) {
  return Object.assign({}, initialGallery, gallery);
}

function extendNavigation(gallery, navigation) {
  return Object.assign({}, gallery, {
    navigation: Object.assign({}, gallery.navigation, navigation),
  });
}

function isIndexInvalid(gallery, index) {
  return index < 0 || index >= gallery.navigation.count;
}

function isInvalidViewMode(viewMode) {
  return modes.indexOf(viewMode) < 0;
}

export function createPreview() {
  return extendGallery(initialGallery);
}

export function setPhotos(gallery, photos) {
  return extendGallery(gallery, {
    photos,
    navigation: {
      index: 0,
      count: photos.length,
      viewMode: THUMBNAILS_MODE,
    },
    updatedAt: new Date(),
  });
}

export function setCurrentPhotoIndex(gallery, index) {
  if (isIndexInvalid(gallery, index)) {
    return gallery;
  }

  return extendNavigation(gallery, {
    index: index,
    viewMode: PHOTO_MODE,
  });
}

export function setViewMode(gallery, viewMode) {
  if (isInvalidViewMode(viewMode)) {
    return gallery;
  }

  return extendNavigation(gallery, {
    viewMode: viewMode,
  });
}
