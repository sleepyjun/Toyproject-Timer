const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 3000,
    hot: true,
  },
  entry: {
    app: path.join(__dirname,  'index.tsx'),
  },
 
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test:/\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

	output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  plugins: [
		new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};