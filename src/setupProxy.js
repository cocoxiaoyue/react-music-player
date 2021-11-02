/* 2.然后创建 src/setupProxy.js 并写入一下转发规则 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(createProxyMiddleware('/musicApi', {
    target: 'http://120.76.42.187:3000/',
    changeOrigin: true,
    pathRewrite: {
      "^/musicApi": "/"
    }
  }));
};