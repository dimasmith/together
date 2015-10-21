import {expect} from 'chai';

import convert, {changeBoundingBox, extractThumbnailLinks, convertToPhotos} from '../../client/dropbox.js';

describe('dropbox integration', () => {
  const thumbnailLink = 'https://api-content.dropbox.com/r11/t/AABTLZP6eELOfB8JWtnq6gFZCmrYNS_-4JLh3cTmZROiDQ/12/2167979/jpeg/_/0/4/2015-10-19%2007.59.09.jpg/CKuphAEgASACIAMgBSAHKAEoAigH/941xvvkyooimetx/AABFUkg__Bb-D_eLyrENtG-xa/2015-10-19%2007.59.09.jpg?bounding_box=75&mode=fit';
  const otherThumbnailLink = 'https://api-content.dropbox.com/r11/t/AAANRWHfF6Fkaq3iPU3wQUl9Qx4qqTmw6iIK6-TRyftbuQ/12/2167979/jpeg/_/0/4/2015-10-18%2016.39.58.jpg/CKuphAEgASACIAMgBSAHKAEoAigH/uv8ztye9sw22mfc/AAAnDjna6n9Ns7ANhGpI5Tgna/2015-10-18%2016.39.58.jpg?bounding_box=75&mode=fit';
  const dropboxFiles = [
    {name: 'picture 1', link: 'some link', thumbnailLink: thumbnailLink},
    {name: 'picture 2', link: 'other link', thumbnailLink: otherThumbnailLink},
  ];

  it('use images of bounding size 1280', () => {
    const thumbnail = changeBoundingBox(thumbnailLink);
    expect(thumbnail).to.contain('bounding_box=1280');
  });

  it('use images of any bounding size', () => {
    const thumbnail = changeBoundingBox(thumbnailLink, 800);
    expect(thumbnail).to.contain('bounding_box=800');
  });

  it('extracts image links from dropbox files object', () => {
    const thumbnailLinks = extractThumbnailLinks(dropboxFiles);

    expect(thumbnailLinks).to.deep.equal([thumbnailLink, otherThumbnailLink]);
  });

  it('converts links to photos', () => {
    const thumbnailLinks = convertToPhotos([thumbnailLink, otherThumbnailLink]);

    expect(thumbnailLinks).to.deep.equal([{url: thumbnailLink}, {url: otherThumbnailLink}]);
  });

  it('convert dropbox files to photos', () => {
    expect(convert(dropboxFiles)).to.deep.equal([
      {url: 'https://api-content.dropbox.com/r11/t/AABTLZP6eELOfB8JWtnq6gFZCmrYNS_-4JLh3cTmZROiDQ/12/2167979/jpeg/_/0/4/2015-10-19%2007.59.09.jpg/CKuphAEgASACIAMgBSAHKAEoAigH/941xvvkyooimetx/AABFUkg__Bb-D_eLyrENtG-xa/2015-10-19%2007.59.09.jpg?bounding_box=1280&mode=fit'},
      {url: 'https://api-content.dropbox.com/r11/t/AAANRWHfF6Fkaq3iPU3wQUl9Qx4qqTmw6iIK6-TRyftbuQ/12/2167979/jpeg/_/0/4/2015-10-18%2016.39.58.jpg/CKuphAEgASACIAMgBSAHKAEoAigH/uv8ztye9sw22mfc/AAAnDjna6n9Ns7ANhGpI5Tgna/2015-10-18%2016.39.58.jpg?bounding_box=1280&mode=fit'},
    ]);
  });
});
