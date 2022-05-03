import Webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import DuplicatePackageCheckerWebpackPlugin from 'duplicate-package-checker-webpack-plugin';
import directoryConfig from './src/config/directory.config.js';

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: './public/index.html' });
const TerserPluginConfig = new TerserPlugin({
  parallel: true,
  terserOptions: {
    ecma: 6,
  },
});

const DuplicatePackageCheckerWebpackPluginConfig = new DuplicatePackageCheckerWebpackPlugin({
  verbose: true,
  emitError: true,
});

const SplitChunksPluginConfig = new Webpack.optimize.SplitChunksPlugin({
  chunks: 'all',
  minSize: 30000,
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
});

export default {
  target: 'web',
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.css'],
    alias: {
      react: path.resolve('./node_modules/react'),
      lodash: path.resolve('./node_modules/lodash'),
    },
  },
  output: {
    path: directoryConfig.dir.distDir,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react-app']
        }
      }
    ]
  },
  plugins: [
    DefinePlugin, 
    HTMLWebpackPluginConfig, 
    TerserPluginConfig,
    DuplicatePackageCheckerWebpackPluginConfig, 
    SplitChunksPluginConfig
  ]
}