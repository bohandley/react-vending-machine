const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path"); 

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry  : "./src/scripts/app.js",     
    output : {
        path: path.resolve(__dirname, "dist"),
        filename : "./dist/scripts/app.js"
    },
    module: {
        rules: [ {
            test    : /.js$/,
            loader  : "babel-loader",
            exclude: /node_modules/,
            query   : {
                presets: [["es2015", "react"]]
            } 
        }
        ]
    },
    plugins :[
        new CleanWebpackPlugin("dist"),
        new HTMLWebpackPlugin({
            filename: "index.html",
            title: "React-TDD",
            mainDiv: "welcome-message",
            template: "src/index.html"
        })
    ]
};