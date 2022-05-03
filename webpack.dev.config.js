import HtmlWebpackPlugin from 'html-webpack-plugin';
import directoryConfig from './src/config/directory.config.js';
import path from 'path';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: './public/index.html' });

export default {
  target: 'web',
  mode: 'development',
  entry: "./src/index.js",
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.css'],
    alias: {
      react: path.resolve('./node_modules/react'),
      lodash: path.resolve('./node_modules/lodash'),
    },
  },
  output: {
    path: directoryConfig.dir.distDir,
    filename: "bundle.js"
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
  plugins: [HTMLWebpackPluginConfig]
}