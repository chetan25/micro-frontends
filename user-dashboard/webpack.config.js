/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "lib" , "user-app.tsx") },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        // publicPath: '/'
        publicPath: "http://localhost:6060/"
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
        new ModuleFederationPlugin({
            name: "user",
            filename: "remoteUserEntry.js",
            // The key name follow the ESM syntax inside Node 14
            exposes: {
                './UserApp': './src/lib/user-app.tsx',
            },
            remotes: {
                Shell: "Shell@http://localhost:4000/remoteEntry.js", 
            },
            // we need to make the shared React and React-dom registered as singleton and loaded from shell
            shared: [{ react: { singleton: true } }, { 'react-dom': { singleton: true } }, { recoil: { singleton: true } }],
        }),
        new HtmlWebpackPlugin({
            title: "Todo",
            inject: true,
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
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
        port: 6060,
        open: true,
        inline: true,
        watchContentBase: true,
    },
};
