const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const PATHS = {
  build: path.join(__dirname, "build"),
  dev: "./dist",
};

const webpackConfig = (env, args) => {
  const isDevMode = args.mode === "development";

  return {
    entry: "./src/js/index",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      path: PATHS.build,
      publicPath: "auto",
      filename: "main.js?[hash]",
    },
    devServer: {
      contentBase: PATHS.dev,
      port: 4001,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    optimization: {
      minimize: !isDevMode,
    },
    module: {
      rules: [
        {
          test: /indexBootstraped\.tsx$/,
          loader: "bundle-loader",
          options: {
            lazy: true,
          },
        },
        {
          test: /\.(js|ts|tsx|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
                modules: {
                  localIdentName: isDevMode ? "[local]" : "[hash:base64:5]",
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "./static/icons/[name].[ext]",
            },
          },
        },
        {
          test: /\.svg$/,
          loader: "file-loader",
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?[hash]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/js/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "static/[name].[hash].css",
      }),
      new CleanWebpackPlugin(),
      new ModuleFederationPlugin({
        name: "app1",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/js/modules/App",
          "./store": "./src/js/core/store/Terminal",
        },
        // Экспортируемые модули
        remotes: {
          // app1: "app1@http://localhost:4001/remoteEntry.js",
        },
        // ✨ Magic: Должно быть у хоста
        shared: [
          "react",
          "react-dom",
          "@material-ui/core",
          "mobx",
          "mobx-react",
        ],
      }),
    ],
  };
};

module.exports = (env, args) => {
  const isDevMode = args.mode === "development";

  require("dotenv").config({
    path: path.resolve(
      __dirname,
      isDevMode ? ".env.development" : ".env.production"
    ),
  });

  const config = webpackConfig(env, args);

  if (isDevMode) {
    config.devtool = "source-map";
  }

  return config;
};
