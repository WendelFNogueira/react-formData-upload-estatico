import Webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: 'index.html' });
const UglifyPlugin = new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }});
const DedupePlugin = new Webpack.optimize.DedupePlugin();
const CommonChunksPlugin = new Webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] });

export default {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    DefinePlugin, 
    HTMLWebpackPluginConfig, 
    UglifyPlugin, 
    DedupePlugin, 
    CommonChunksPlugin
  ],
}