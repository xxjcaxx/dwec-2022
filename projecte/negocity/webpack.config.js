const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // o production
  entry: "./src/scripts.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    //sourceMapFilename: "[name].js.map"
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff|woff2|ttf)$/,
        type: "asset/resource",
      },
     
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "Negocity",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};
