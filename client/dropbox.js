export function changeBoundingBox(thumbnailLink, boundingBoxSize = 1280) {
  return thumbnailLink.replace(/bounding_box=\d+/, `bounding_box=${boundingBoxSize}`);
}

function extractThumbnailLink() {
  return file => file.thumbnailLink;
}
export function extractThumbnailLinks(files) {
  return files.map(extractThumbnailLink());
}

export function convertToPhotos(thumbnailLinks) {
  return thumbnailLinks.map(link => {
    return {url: link};
  });
}

export default function convert(dropboxFiles) {
  return dropboxFiles
    .map(file => extractThumbnailLink(file))
    .map(link => changeBoundingBox(link))
    .map(convertToPhotos);
}
