const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const mainUrl = (process.env.NODE_ENV === 'development') ? "/" : "https://shishovka.github.io/news-explorer-frontend/"
const savedNewsUrl = (process.env.NODE_ENV === 'development') ? "/saved-news.html" : "https://shishovka.github.io/news-explorer-frontend/saved-news"

module.exports = {
  entry: { 
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },

      { 
        test: /\.css$/i,
        use: [ (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
      },

      { 
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      },


       // пример настройки плагина image-webpack-loader
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: ['file-loader?name=./images/[name].[ext]',
              { loader: 'image-webpack-loader',options: {} }
            ]
      }
    ]
  },

  plugins: [ 
    new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: { preset: ['default'] },
      canPrint: true
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
      main_Url: mainUrl,
      savedNews_Url: savedNewsUrl,
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/saved-news.html',
      filename: 'saved-news.html',
      chunks: ['main'],
      main_Url: mainUrl,
      savedNews_Url: savedNewsUrl,
    }),

    new WebpackMd5Hash(),
    
    new webpack.DefinePlugin({'NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  ]
};