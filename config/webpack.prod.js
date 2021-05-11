const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { merge } = require("webpack-merge")
const path = require("path")
const common = require("./webpack.common")
/** @type {import('webpack'.Configuration)} */
const prodConfig = {
    mode: "production",
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [ new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                use:[MiniCssExtractPlugin.loader,"css-loader",{
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

module.exports = merge( common, prodConfig)