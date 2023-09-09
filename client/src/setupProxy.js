const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.proxy, // Replace with your API server URL
      changeOrigin: true,
    })
  );
};
