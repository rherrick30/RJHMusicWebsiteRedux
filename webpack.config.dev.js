const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

process.env.NODE_ENV = "development";
const stylesHandler = "style-loader";


module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    static: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL":JSON.stringify("http://localhost:3001/")
    }),
    new webpack.DefinePlugin({
      "process.env.WB_URL":JSON.stringify("http://localhost:9000/")
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/rjh.ico"
    }),
    new ErrorOverlayPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ["file-loader"],
      }
    ]
  }
};
