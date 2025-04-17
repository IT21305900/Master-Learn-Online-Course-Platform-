const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/authentication",
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST,DELETE, PUT, OPTIONS"
      );
    },
  })
);

app.use(
  "/course",
  createProxyMiddleware({
    target: "http://localhost:8002",
    changeOrigin: true,
    onProxyReq: function(proxyReq, req, res) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, OPTIONS"
      );
    },
  })
);

app.use(
  "/lesson",
  createProxyMiddleware({
    target: "http://localhost:8003",
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PUT, OPTIONS"
      );
    },
  })
);

const startServer = async () => {
  try {
    app.listen(3128, () => {
      console.log(`Proxy Server Started at Port  8080`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
