const fetch = require('node-fetch');
const { get } = require('../enums/fetch.js');

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

  get({ type, orgName, repoName }) {
    return fetch(`${this.buildUrl({ type, orgName, repoName })}`, { method: 'GET' })
      .then(response => {
        if (response.status === 200) return response.json()
        throw response;
      })
      .catch(error => ({ error }))
  }
}

module.exports = new Fetch();
