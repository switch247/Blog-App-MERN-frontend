const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target:"https://blogback-8voh.onrender.com/api/", // Replace with your API server URL
        changeOrigin: true,
      })
    );
  };
