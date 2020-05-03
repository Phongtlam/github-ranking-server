const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  // octokit.repos
  //   .listForOrg({
  //     org: "netflix",
  //     type: "public"
  //   })
  //   .then(({ data }) => {
  //     console.log('data', data)
  //     // handle data
  //     res.send(JSON.stringify(data))
  //   });

  fetch("https://api.github.com/orgs/netflix/repos", { method: 'GET' })
    .then(response => response.json())
    .then(response => {
      console.log('response is', response)
      res.send(JSON.stringify(response))
    })
})

module.exports = app;