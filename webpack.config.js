const webpack = require("webpack");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

/* Location of static files folder on server */
const STATIC_PATH = 'static';
/* Location of images, fonts, etc. inside "STATIC_PATH" folder */
const ASSETS_PATH = 'assets';

module.exports = {
  /* Application bundle has a fixed name and is located in "STATIC_PATH" folder */
  entry: {
    [path.join(STATIC_PATH, 'js', 'app')]: process.env.WEBPACK_ENTRY,
    [path.join(STATIC_PATH, 'js', 'lib')]: ['babel-polyfill', 'jquery']
  },

  /* Bundle is placed in target folder defined by "WEBPACK_TARGET" environment variable */
  output: {
    filename: '[name].bundle.js',
    path: process.env.WEBPACK_TARGET,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.less']
  },

  /* Don't show messages from plugins */
  stats: {
    children: false
  },

  /* Redirect all 404 errors to index.html */
  devServer: {
    historyApiFallback: true,
    stats: {
      children: false
    },
    disableHostCheck: true,
    port: 9000
  },

  module: {
    rules: [
      /* Compile TypeScript into ES5 JavaScript */
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {'presets': ['env']}
          },
          {loader: 'ts-loader'}
        ]
      },
      /* Extract common file types and place them in target "STATIC_PATH" folder */
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            outputPath: `./${STATIC_PATH}/${ASSETS_PATH}/`,
            publicPath: (process.env.NODE_ENV === 'development')
              ? `/${STATIC_PATH}/${ASSETS_PATH}`
              : `/${ASSETS_PATH}/`
          }
        }
      },
      /* Compile and extract LESS */
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {loader: 'css-loader'},
            {loader: 'less-loader'}
          ]
        })
      },
      /* Compile and extract CSS */
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    /* Extract styles to same location as application bundle */
    new ExtractTextPlugin(path.join(STATIC_PATH, 'css', 'styles.bundle.css')),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(process.env.HOST)
    })
  ]
};

