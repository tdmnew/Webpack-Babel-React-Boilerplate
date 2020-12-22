const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
        chunkFilename: "[name].bundle.js",
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "dev"),
        compress: true,
        port: 5000,
        open: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
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
    ],
};
