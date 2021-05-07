require('dotenv').config();

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const ExternalTemplateRemotesPlugin = require('./ExternalTemplateRemotesPlugin');
const pkgJson = require('./package.json');
const webpack = require('webpack');

/**
 * @returns {Promise<import('webpack').Configuration>}
 */
module.exports = async (env, { mode }) => {
  return {
    mode,
    output: {
      publicPath: 'auto',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    devServer: {
      port: 8085,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },

    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    devtool: false,

    plugins: [
      new webpack.EnvironmentPlugin({
        FEDERATION_ENDPOINT:
          'https://my-json-server.typicode.com/malcolm-kee/federation-api/federations/bootstrap',
      }),
      new ModuleFederationPlugin({
        name: pkgJson.federations.name,
        filename: 'remoteEntry.js',
        remotes: {
          '@mkeeorg/shell-app': `shell@[window._endpoints.shell]/remoteEntry.js`,
        },
      }),
      new ExternalTemplateRemotesPlugin(),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
    ],
  };
};
