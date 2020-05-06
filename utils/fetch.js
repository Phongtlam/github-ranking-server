const fetch = require('node-fetch');

const { queryParamsBuilder } = require('./queryParams');
const { get } = require('../enums/fetch');
const getTotalPageFromLink = require('./getTotalPageFromLink');

class Fetch {
  constructor() {
    this.githubUrl = 'https://api.github.com';
  }

  /**
   *
   * @param type {string}
   * @param orgName {string}
   * @param repoName {string}
   * @returns {string}
   */
  buildRelativePathUrl({ type = '', orgName = '', repoName = '' }) {
    if (type === get.ALL_REPOS) {
      return `/orgs/${orgName}/repos`;
    } else if (type === get.VIEW_COMMITS) {
      return `/repos/${orgName}/${repoName}/commits`;
    }
  }

  /**
   *
   * @param type {string}
   * @param orgName {string}
   * @param repoName {string}
   * @param query {object}
   * @returns {Promise<void | {error: any}> | Promise<any>}
   */
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
    };
    const accessToken = process.env.ACCESS_TOKEN;
    if (accessToken && accessToken.length) {
      headers.Authorization = `token ${accessToken}`;
    }
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
