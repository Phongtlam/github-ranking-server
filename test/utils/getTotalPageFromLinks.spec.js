const { expect, test } = require('@jest/globals');
const getTotalPageFromLink = require('../../utils/getTotalPageFromLink.js');

test('return correct max page count', () => {
  const link =
    '<https://api.github.com/organizations/913567/repos?page=2&sort=updated>; rel="next", <https://api.github.com/organizations/913567/repos?page=6&sort=updated>; rel="last"';
  expect(getTotalPageFromLink(link)).toBe(6);
});

test('return -1 if no page count exists', () => {
  expect(getTotalPageFromLink('hello')).toBe(1);
});
