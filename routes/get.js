const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/', (req, res) => {
  fetch("https://api.github.com/orgs/netflix/repos", { method: 'GET' })
    .then(response => response.json())
    .then(response => {
      console.log('response is', response)
      res.send(JSON.stringify(response))
    })
});

module.exports = router;