# Gilded Rose Visitor UI

> Web UI for Gilded Rose Visitor, built with [React].

[![Build Status](https://img.shields.io/travis/amercier/gilded-rose-visitor/master.svg)](https://travis-ci.org/amercier/gilded-rose-visitor)
[![Test Coverage](https://img.shields.io/codecov/c/github/amercier/gilded-rose-visitor/master.svg)](https://codecov.io/github/amercier/gilded-rose-visitor?branch=master)
[![Dependency Status](https://img.shields.io/david/amercier/gilded-rose-visitor.svg)](https://david-dm.org/amercier/gilded-rose-visitor)
[![devDependency Status](https://img.shields.io/david/dev/amercier/gilded-rose-visitor.svg)](https://david-dm.org/amercier/gilded-rose-visitor#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/amercier/gilded-rose-visitor.svg)](https://github.com/amercier/gilded-rose-visitor/issues?q=label%3Agreenkeeper)

## Getting started

This application is built with [Next.js].

### Dependencies

Before starting, install [NodeJS] and [Yarn].

```bash
yarn
```

Installs this project's dependencies in the `node_modules` folder.

### Development

**Note:** Gilded Rose API must be available at http://localhost:8080/.

```bash
yarn dev
```

Runs the app in the development mode.<br>
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Testing

```bash
yarn test --watch
```

Launches the test runner in the interactive watch mode.

### Building

```bash
REACT_APP_API_URL=http://localhost:8080 yarn build
```

> **Note:** replace `http://localhost:8080` with the URL where the API is available in production,
> ex: `/api`.

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## License

[![License](https://img.shields.io/github/license/amercier/gilded-rose-visitor.svg)](LICENSE.md)

[next.js]: https://nextjs.org/
[react]: https://reactjs.org/
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[github pages]: https://pages.github.com/
[github pages deployment]: https://docs.travis-ci.com/user/deployment/pages/
