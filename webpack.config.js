const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            inlineSource: ".(js|css)$" // embed all javascript and css inline
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".mjs"]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    entry: "./index.tsx"
};
