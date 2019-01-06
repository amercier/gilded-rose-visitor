const RE = /^REACT_APP_/i;

/**
 * Extracts all environment variables starting by REACT_APP_.
 *
 * @type {Object} An object sub-set of process.env containing only REACT_APP_ variables.
 */
module.exports = Object.entries(process.env).reduce(
  (exports, [key, value]) =>
    RE.test(key) ? { ...exports, [`process.env.${key}`]: value } : exports,
  {},
);
