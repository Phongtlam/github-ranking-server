const fetch = require('node-fetch');
const Headers = require('node-fetch');

const { queryParamsBuilder } = require('./queryParams');

const { get } = require('../enums/fetch.js');

const getTotalPageFromLink = (link) => {
  const reg = new RegExp('[0-9]');
  if (!link || !link.length) return 1;
  const split = link.split('page=');
  let res = -Infinity;
  for (const el of split) {
    let str = '';
    for (let i = 0; i < el.length; i++) {
      if (reg.test(el[i])) {
        str += el[i];
      } else {
        break;
      }
    }
    let temp = Number(str);
    if (!isNaN(temp)) {
      res = Math.max(res, temp);
    }
  }
  return res === -Infinity ? 1 : res;
};

class Fetch {
  constructor() {
    this.githubUrl = 'https://api.github.com';
  }

  buildRelativePathUrl({ type = '', orgName = '', repoName = '' }) {
    if (type === get.ALL_REPOS) {
      return `/orgs/${orgName}/repos`;
    } else if (type === get.VIEW_COMMITS) {
      return `/repos/${orgName}/${repoName}/commits`;
    }
  }

  get({ type, orgName, repoName, query }) {
    const queryString = queryParamsBuilder(query);
    const url = new URL(
      `${this.buildRelativePathUrl({
        type,
        orgName,
        repoName,
      })}?${queryString}`,
      this.githubUrl
    );
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      Authorization: `token ${process.env.ACCESS_TOKEN}`,
    };
    return fetch(url, {
      method: 'GET',
      headers,
    })
      .then((res) => {
        return res
          .json()
          .then((json) => {
            return {
              totalPage: getTotalPageFromLink(res.headers.get('link')),
              status: res.status,
              data: json,
            };
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => ({ error }));
  }
}

module.exports = new Fetch();