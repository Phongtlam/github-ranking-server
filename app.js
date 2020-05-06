const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const routes = require('./routes');

const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/get', routes.get);
app.use('/', (req, res) => {
  res.send('hello to github ranking');
});

module.exports = app;
