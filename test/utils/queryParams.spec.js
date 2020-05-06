const { expect, test } = require('@jest/globals');
const {
  queryParamsBuilder,
  extractGetQueryParams,
} = require('../../utils/queryParams.js');

test('create query param strings from object', () => {
  expect(
    queryParamsBuilder({
      hello: '1',
      newVal: 'value',
      array: [1, 2, 3],
    })
  ).toBe('hello=1&newVal=value&array=1%2C2%2C3');
});

test('create query param strings from object with non standard chars', () => {
  expect(
    queryParamsBuilder({
      hello: '1 2 3 4 5',
      newVal: 'new&&&*)()',
      array: [1, 2, 3],
    })
  ).toBe('hello=1%202%203%204%205&newVal=new%26%26%26*)()&array=1%2C2%2C3');
});

test('extracts get query params with default org to be netflix', () => {
  expect(
    extractGetQueryParams({
      url: 'www.new-app.com?hello=1&newVal=value&array=1%2C2%2C3',
    })
  ).toEqual({
    query: {
      hello: '1',
      newVal: 'value',
      array: '1,2,3',
    },
    orgName: 'netflix',
    repoName: '',
  });
});

test('extracts get query params with non org to be netflix', () => {
  expect(
    extractGetQueryParams({
      url:
        'www.new-app.com?orgName=neworg&hello=1&newVal=value&array=1%2C2%2C3',
    })
  ).toEqual({
    query: {
      hello: '1',
      newVal: 'value',
      array: '1,2,3',
    },
    orgName: 'neworg',
    repoName: '',
  });
});
