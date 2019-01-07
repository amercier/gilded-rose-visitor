#!/usr/bin/env node

const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const koaStatic = require('koa-static');

/**
 * Serve Next application with custom routes.
 *
 * @param {Object} config - Server settings,.
 * @param {boolean} config.dev - Next serve development mode enabled or not.
 * @param {number} config.port - Server port.
 * @param {Object} config.routes - Paths to pages indexed by routes. Ex: `{ '/p/:id': /post }`.
 * @param {string} config.staticPath - Path to static files.
 * @returns {number} The port the server is listening on.
 */
async function serve({ dev, port, routes, staticPath }) {
  const app = next({ dev });
  const handle = app.getRequestHandler();

  await app.prepare();

  const server = new Koa();
  const router = new Router();

  server.use(koaStatic(staticPath));

  Object.entries(routes).forEach(([route, path]) => {
    router.get(route, async ctx => {
      await app.render(ctx.req, ctx.res, path, ctx.params);
      ctx.respond = false;
    });
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, nextStep) => {
    ctx.res.statusCode = 200;
    await nextStep();
  });

  server.use(router.routes());
  await new Promise(resolve => server.listen(port, resolve));

  return port;
}

// Start the server now
/* eslint-disable no-console */
// eslint-disable-next-line more/no-then
serve({
  dev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
  routes: {
    '/i/:id': '/item',
  },
  staticPath: `${__dirname}/public`,
}).then(
  actualPort => {
    console.log(`> Ready on http://localhost:${actualPort}`);
  },
  error => {
    console.error(error);
    process.exit(1);
  },
);
/* eslint-enable no-console */
