// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = ({ platform }, defaults) => ({
  entry: ['react-hot-loader/patch', `./index.${platform}.js`],
  devServer: {
    ...defaults.webServer,
  },
  plugins: [
    ...defaults.plugins,
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
});
