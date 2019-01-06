const AUTO_ENV_VARS = /^REACT_APP_/i;

/**
 * Extracts all environment variables starting by REACT_APP_.
 *
 * @type {Object} An object sub-set of process.env containing only REACT_APP_ variables.
 */
const env = Object.entries(process.env).reduce(
  (exports, [key, value]) =>
    AUTO_ENV_VARS.test(key)
      ? { ...exports, [`process.env.${key}`]: value }
      : exports,
  {},
);

// TODO Find a way to move this back to package.json
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          modules: 'commonjs',
        },
      },
    ],
  ],
  plugins: [['transform-define', env]],
};
