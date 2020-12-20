import * as path from 'path';
import * as webpack from 'webpack';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// import { ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// const webpack = require('webpack');
``
const config: webpack.Configuration = {
    entry: { index: path.resolve(__dirname, "src", "index.tsx") },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        }),
        new HtmlWebpackPlugin({
            title: "App Shell",
            inject: true,
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        usedExports: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            react: path.resolve(__dirname, 'node_modules', 'react'),
            'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        headers: { "Access-Control-Allow-Origin": "*" },
        hot: true,
        port: 4000,
        open: true,
        inline: true,
        watchContentBase: true,
    },
};

export default config;