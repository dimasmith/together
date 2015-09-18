export function createExamplePhoto(index) {
  const url = `http://examplephotos/${index}.png`;
  return {url};
}

export function createExamplePhotos(amount) {
  return new Array(amount)
    .map((item, index) => createExamplePhoto(index));
}
