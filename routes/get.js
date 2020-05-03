const express = require('express');
const url = require('url');
const fetch = require('../utils/fetch.js');
const { get } = require("../enums/fetch");

const router = express.Router();

router.get('/all-repos', (req, res) => {
  const qs = url.parse(req.url, true).query;
  const orgName = qs.orgName || 'netflix';
  fetch.get({
    type: get.ALL_REPOS,
    orgName
  })
    .then(response => {
      res.send(JSON.stringify(response))
    });
});

router.get('/view-commits', (req, res) => {
  const qs = url.parse(req.url, true).query;
  const orgName = qs.orgName || 'netflix';
  const repoName = qs.repoName || '';
  const orgPage = qs.orgPage || 1;
  fetch.get({
    type: get.VIEW_COMMITS,
    orgName,
    repoName,
    page: orgPage
  })
    .then(response => {
      res.send(JSON.stringify(response))
    });
});

module.exports = router;