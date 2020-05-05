const fetch = require('node-fetch');
const { queryParamsBuilder } = require("./queryParams");

const { get } = require('../enums/fetch.js');

const getTotalPageFromLink = link => {
  const reg = new RegExp('[0-9]');
  if (!link || !link.length) return 1;
  const split = link.split('page=');
  let res = -Infinity;
  for (const el of split) {
    let str = ''
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
  console.log('what is res', res)
  return res === -Infinity ? 1 : res;
}

class Fetch {
  constructor() {
    this.githubUrl = "https://api.github.com";
  }

  buildUrl({ type = '', orgName = '', repoName = '' }) {
    if (type === get.ALL_REPOS) {
      return `${this.githubUrl}/orgs/${orgName}/repos`;
    } else if (type === get.VIEW_COMMITS) {
      return `${this.githubUrl}/repos/${orgName}/${repoName}/commits`;
    }
  }

  get({ type, orgName, repoName, query }) {
    const queryString = queryParamsBuilder(query)
    const url = `${this.buildUrl({ type, orgName, repoName })}?${queryString}`;
    console.log('queryString', url)
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: "token 5a43e0f8ce33364bfdcc71fc6f54c93e60ace88e"
      }
    })
      .then(res => {
        console.log(res)
        return res.json().then(json => {
          return {
            totalPage: getTotalPageFromLink(res.headers.get('link')),
            status: res.status,
            data: json
          }
        })
          .catch(error => {
            throw new Error(error)
          })
      })
      .catch(error => ({ error }))
  }
}

module.exports = new Fetch();
