const fetch = require('node-fetch');

const { get } = require('../enums/fetch.js');

const getTotalPageFromLink = link => {
  const split = link.split('page=');
  const target = split[split.length - 1];
  return Number(target.split('>')[0]);
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
    return fetch(`${this.buildUrl({ type, orgName, repoName })}?${query}`, { method: 'GET' })
      .then(res => {
        return res.json().then(json => ({
          totalPage: getTotalPageFromLink(res.headers.get('link')),
          status: res.status,
          data: json
        }))
          .catch(error => {
            throw new Error(error)
          })
      })
      .catch(error => ({ error }))
  }
}

module.exports = new Fetch();
