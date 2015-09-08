export const THUMBNAILS_MODE = 'THUMBNAILS';
export const PHOTO_MODE = 'PHOTO';

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
    navigation: Object.assign({}, gallery.navigation, navigation)
  });
}

export function createPreview() {
  return extendGallery(initialGallery);
}

export function setPhotos(gallery, photos) {
  console.info('set photos');
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
  return extendNavigation(gallery, {
    index: index,
    viewMode: PHOTO_MODE,
  });
}

export function setViewMode(gallery, viewMode) {
  return extendNavigation(gallery, {
    viewMode: viewMode,
  });
}
