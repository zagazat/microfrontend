const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    build: path.join(__dirname, 'build'),
    dev: './dist',
};

module.exports = (env, args) => {
    const isDevMode = args.mode === 'development';

    return {
        entry: {
            main: './src/js/index.tsx',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        output: {
            path: PATHS.build,
            publicPath: 'auto',
            filename: 'main.js?[hash]',
        },
        devServer: {
            contentBase: PATHS.dev,
            port: 5000,
            historyApiFallback: true,
            hot: true,
        },
        module: {
            rules: [
                {
                    test: /indexBootstraped\.tsx$/,
                    loader: 'bundle-loader',
                    options: {
                        lazy: true,
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/js/index.html',
                title: 'Module Federation Remote',
            }),
            new CleanWebpackPlugin(),
        ],
    };
};
