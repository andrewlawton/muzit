// webpack.config.js

var path = require('path')
var webpack = require('webpack')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    site: ['./assets/javascripts/index.js', './assets/stylesheets/index.scss']
  },
  output: {
    filename: 'assets/javascripts/[name].js',
    path: path.resolve(__dirname, '.tmp/dist')
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer'),
                  require('postcss-flexbugs-fixes')
                ]
              }
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eof|eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/[name].css'
    })
  ]
}