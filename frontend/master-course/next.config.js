// next.config.js
const nextConfig = {
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000, // check for changes every second
        aggregateTimeout: 300,
      };
      return config;
    },
  };
  
  module.exports = nextConfig;
  