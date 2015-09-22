export function createExamplePhoto(index) {
  const url = `http://examplephotos/${index}.png`;
  return {url};
}

export function createExamplePhotos(amount) {
  const emptyPhotos = new Array(amount).fill({});
  return emptyPhotos.map((item, index) => createExamplePhoto(index));
}
