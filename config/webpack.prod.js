const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { merge } = require("webpack-merge")
const Dotenv = require('dotenv-webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
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
    plugins: [ new Dotenv({path: './.env.production',}),  
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns:[
          { from: './public/robots.txt', to: 'robots.txt' },
          { from: './public/sitemap.xml', to: 'sitemap.xml' },
        ]
      }),
    ],
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
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin(),
        ],
      },

}

module.exports = merge( common, prodConfig)