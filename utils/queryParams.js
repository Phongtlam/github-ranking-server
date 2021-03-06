const url = require('url');

/**
 *
 * @param objParams {object}
 * @returns {string}
 */
const queryParamsBuilder = (objParams) => {
  const esc = encodeURIComponent;
  return Object.keys(objParams)
    .map((key) => esc(key) + '=' + esc(objParams[key]))
    .join('&');
};

/**
 *
 * @param req {{ url }}
 * @returns {{orgName: (*|string), repoName: (*|string)}}
 */
const extractGetQueryParams = (req) => {
  const qs = url.parse(req.url, true).query;
  const res = {
    orgName: qs.orgName || 'netflix',
    repoName: qs.repoName || '',
  };

  res.query = Object.keys(qs).reduce((hash, key) => {
    if (key !== 'orgName' && key !== 'repoName') {
      if (key === 'page') {
        hash[key] = qs[key] || 1;
      } else {
        hash[key] = qs[key];
      }
    }
    return hash;
  }, {});

  return res;
};

module.exports = {
  queryParamsBuilder,
  extractGetQueryParams,
};
