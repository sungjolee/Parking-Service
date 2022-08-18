const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: "http://192.168.35.165:3000",
      changeOrigin: true,
    })
  );
};
