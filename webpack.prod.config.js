// const config = require('./webpack.config.js');
// const webpack = require('webpack');

// config.plugins.push(
//   new webpack.DefinePlugin({
//     "process.env": {
//       "NODE_ENV": JSON.stringify("production")
//     }
//   })
// );

// // config.plugins.push(
// //   new webpack.optimize.UglifyJsPlugin({
// //     compress: {
// //       warnings: false
// //     }
// //   })
// // );

// module.exports = config;

// "build": "webpack --config webpack.prod.config.js",
//     "dev": "webpack-dev-server --hot --inline",
//     "lint": "eslint src/**",
//     "lint:watch": "esw -w src/**",
//     "review": "npm run lint && npm test",
//     "start": "npm run build && NODE_ENV=production node server.js",
//     "test": "jest src/**",
//     "test:watch": "jest src/** --watch",
//     "test:watchAll": "jest src/** --watchAll",
//     "test:coverage:report": "open coverage/lcov-report/index.html"