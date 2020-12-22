const webpack = require("webpack");
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "dev"),
    },
    resolve: {
        modules: [path.resolve(__dirname, "./src"), "node_modules"],
        extensions: [".js", ".jsx"],
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "dev"),
        compress: true,
        port: 5000,
        open: true,
        hot: true,
    },
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(tff|eot|svg|woff|png)$/,
                exclude: /node_modules/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src", "./public/index.html"),
            filename: "index.html",
        }),
        new webpack.ProvidePlugin({
            _: "lodash",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css",
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
