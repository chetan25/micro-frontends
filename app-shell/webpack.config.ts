/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path';
import * as webpack from 'webpack';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// import { ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

 type WebPackOption = webpack.Configuration | webpack.WebpackOptionsNormalized ;
const config: WebPackOption = {
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
                test: /bootstrap\.tsx$/,
                // uses to make the dep from bootstrap load not as eager and waits for the dep to load first
                loader: "bundle-loader",
                options: {
                    lazy: true,
                },
            },
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
            name: "Shell",
            filename: "remoteEntry.js",
            remotes: {
                todos: "todos@http://localhost:6050/remoteTodosEntry.js",
            },
            exposes: {
                "./SharedStateService": "./src/redux/stateSubscriber",
            },
            // we need to make the shared React and React-dom registered as singleton and loaded from shell
            shared: [
                {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
                // had to put this in shared deps for the service to be loaded in the consumer properly
                "./src/redux/stateSubscriber",
            ],
        }),
        new HtmlWebpackPlugin({
            title: "App Shell",
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
        contentBase: path.join(__dirname, "dist"),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
        hot: true,
        historyApiFallback: {
            index: 'index.html'
        },
        port: 4000,
        open: true,
        inline: true,
        watchContentBase: true,
    },
};

export default config;
