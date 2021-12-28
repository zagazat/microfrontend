const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

// const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");

const PATHS = {
  build: path.join(__dirname, "build"),
  dev: "./dist",
};

module.exports = (env, args) => {
  const isDevMode = args.mode === "development";
  const isEnvDevelopment = args.mode === "development";

  return {
    entry: {
      main: "./src/index.tsx",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    output: {
      path: PATHS.build,
      publicPath: "",
      filename: isDevMode
        ? "[name].[fullhash].js"
        : "[name].[contenthash:8].js",
      chunkFilename: isDevMode
        ? "[name].chunk.js"
        : "[name].[contenthash:8].chunk.js",
    },
    devServer: {
      contentBase: PATHS.dev,
      port: 4003,
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        // {
        //     test: /indexBootstraped\.jsx$/,
        //     loader: 'bundle-loader',
        //     options: {
        //         lazy: true,
        //     },
        // },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "Module Federation Remote2",
      }),
      new CleanWebpackPlugin(),
      // new ModuleFederationPlugin({
      //     name: 'host',
      //     remotes: {
      //         app1: 'app1@http://localhost:4001/remoteEntry.js',
      //     },
      //     shared: ['react'],
      // }),
      // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
    ],
    optimization: {
      // minimize: !isDevMode,
      // splitChunks: {
      //     chunks: 'all',
      // //     name: isDevMode,
      // },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      // runtimeChunk: {
      //     name: (entrypoint) => `runtime-${entrypoint.name}`,
      // },
    },
  };
};
