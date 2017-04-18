import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import PrerenderSpaPlugin from 'prerender-spa-plugin'
import {resolve} from 'path'

import data from './src/data'

const babelLoader = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
}

const eslintLoader = {
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
  enforce: 'pre'
}

const pugLoader = {
  test: /\.pug$/,
  loader: 'pug-loader'
}

const stylusLoader = {
  test: /\.styl$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'stylus-loader'
    ]
  })
}

const vueLoader = {
  test: /\.vue$/,
  loader: 'vue-loader'
}

const urlLoader = {
  test: /\.(png|jpg|gif|svg|woff2)$/,
  loader: 'url-loader',
  options: {
    limit: 20 * 1024, // bytes
    name: '[name].[hash].[ext]' // fallback
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

function choosePlugins (plugins) {
  if (isDevelopment) {
    return plugins.development
  } else {
    return plugins.development.concat(plugins.production)
  }
}

const publicPath = '/'
const outputPath = resolve(__dirname, './dist')

export default {
  entry: [ 'babel-polyfill', './src/base.styl', './src/main.js' ],
  output: {
    path: outputPath,
    publicPath: publicPath,
    filename: 'build.[hash].js'
  },
  module: {
    rules: [
      babelLoader,
      eslintLoader,
      pugLoader,
      stylusLoader,
      vueLoader,
      urlLoader
    ]
  },
  plugins: choosePlugins({
    development: [
      new FaviconsWebpackPlugin({
        logo: './src/assets/logo.svg',
        prefix: 'icon.[hash].'
      }),
      new ExtractTextPlugin({
        filename: 'build.[contenthash].css',
        disable: isDevelopment
      }),
      new HtmlWebpackPlugin({
        template: './src/index.pug'
      })
    ],
    production: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new CopyPlugin([
        { from: './_redirects', to: './' }
      ]),
      new PrerenderSpaPlugin(
        outputPath,
        [
          '/report-vote',
          '/report-vote/progress',
          '/report-vote/data',
          ...data.liberals.map(leader => leader.link)
        ],
        {
        }
      ),
      new PrerenderSpaPlugin(
        outputPath,
        [ '/' ],
        {
        }
      )
    ]
  }),
  devServer: {
    publicPath: publicPath,
    historyApiFallback: true
  },
  devtool: isDevelopment ? '#eval-source-map' : '#source-map'
}
