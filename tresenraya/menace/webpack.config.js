const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  //target: 'node',

    mode: 'development',
    devtool: 'source-map',
  entry: './src/tres.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
    
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Tres en raya',
        filename: 'index.html',
        template: 'src/index.html',
    }),
    
],



 
 
};