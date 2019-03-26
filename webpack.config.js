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
  resolve: {
    alias: {
      'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
      'jquery-tageditor': 'jquery-tageditor/jquery.tag-editor.js',
    },
  },
  module: {
    rules: [


      {
        test:  /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
            publicPath: '/'
        },
      },


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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },





      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //         name: 'assets/images/[name].[ext]',
      //         //context: path.resolve(__dirname, "assets/images"),
      //         //outputPath: 'dist/',
      //         publicPath: '../',
      //         //publicPath: 'http://localhost:4567',
      //         useRelativePaths: true
      //     },
      //   },
      // },

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
}