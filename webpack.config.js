var path = require('path');
const PATHS = {
  app: path.resolve(__dirname, '../src/'),
  styles: path.resolve(__dirname, '../src/styles'),
  dist: path.resolve(__dirname, '../dist')
};
module.exports = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',

    // Add your application's scripts below
    './src/index',
  ],
  resolve: {
   modulesDirectories: ['node_modules', './src'],
   extensions: ['', '.js', '.jsx']
  },
  stats: {
    colors: true,
    reasons: true
  },
  output: {
     path: './dist/',
     filename: 'app.js'
   },
  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.js?$/,

        // Options to configure babel with
        query: {
          // plugins: ['transform-runtime'],
          presets: ['es2015','react'],
        }
      }]
  }
};
