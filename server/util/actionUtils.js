export function extractIndex(navigation) {
  if (typeof navigation === 'object') {
    return navigation.index;
  } else if (typeof navigation === 'number') {
    return navigation;
  }
  throw new Error('parameter should be either number or object with numeric index property');
}
