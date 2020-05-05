const express = require('express');
const url = require('url');
const fetch = require('../utils/fetch.js');
const { extractGetQueryParams } = require('../utils/queryParams.js');
const { get } = require('../enums/fetch');

const router = express.Router();

router.get('/all-repos', (req, res) => {
  const reqParser = extractGetQueryParams(req);
  fetch
    .get({
      type: get.ALL_REPOS,
      ...reqParser,
    })
    .then((response) => {
      res.send(JSON.stringify(response));
    });
});

router.get('/view-commits', (req, res) => {
  const reqParser = extractGetQueryParams(req);
  fetch
    .get({
      type: get.VIEW_COMMITS,
      ...reqParser,
    })
    .then((response) => {
      res.send(JSON.stringify(response));
    });
});

module.exports = router;
