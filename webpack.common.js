const path = require("path");
const prodDir = "dist";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ["./src/js/index.js", "./src/css/index.scss"],
    output: {
        path: path.resolve(__dirname, prodDir),
        filename: "assets/js/index.bundle.js"
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'sass-loader',
            ]
        }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/index.bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/template/index.html",
            filename: "index.html"
        }),
        new CopyPlugin({
            patterns: [{
                    from: "src/img",
                    to: "assets/img"
                },
                {
                    from: "src/font",
                    to: "assets/font"
                }
            ],
            options: {
                concurrency: 1000,
            },
        })
    ]
}
