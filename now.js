const { sep } = require('path');
const escape = require('escape-string-regexp');
const globby = require('globby');

const dir = 'public';
const dirRE = new RegExp(`^${escape(dir)}${sep}`);
const paths = globby.sync(`${dir}`).map(path => path.replace(dirRE, ''));

/**
 * Dynamic Now configuration
 *
 * @example
 *     node -e "console.log(JSON.stringify(require('./now')))" > now.json
 * @see Deployment Configuration (now.json): https://zeit.co/docs/v2/deployments/configuration/
 */
module.exports = {
  version: 2,
  builds: [
    { src: `${dir}/**`, use: '@now/static' },
    { src: 'package.json', use: '@now/next' },
  ],
  routes: [
    ...paths.map(path => ({ src: `/${path}`, dest: `/${dir}/${path}` })),
    { src: '/i/(?<id>[^/]*)', dest: '/item?id=$id' },
  ],
};
