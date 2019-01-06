const env = require('./src/env.config.js');

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
