const { merge } = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common")
const Dotenv = require('dotenv-webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin } = require("webpack")
/** @type {import('webpack'.Configuration)} */
const devConfig = {
    mode: "development",
    devServer: {
        port: 3000,
        contentBase: "../dist",
        hot: true,
        historyApiFallback: true
    },
    target: "web",
    plugins: [
        new Dotenv({path: './.env',}),
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                use:["style-loader","css-loader",{
                    loader: "postcss-loader",
                    options: {
                      postcssOptions: {
                        config: path.resolve(__dirname, "../postcss.config.js"),
                      },
                    }, 
                }],
                test: /\.css$/i,
            },
        ]
    }
}

module.exports = merge( common, devConfig)