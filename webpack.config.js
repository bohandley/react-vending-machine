const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const HTMLWebpackPlugin = require("html-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
const path = require("path"); 

module.exports = {
    devtool: "source-map",
    entry  : "./src/scripts/app.js",     
    output : {
        path: path.resolve(__dirname, "dist"),
        filename : "./scripts/app.js"
    },
    module: {
        rules: [
            {
                test    : /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader  : "babel-loader",
                    options: {
                        presets: ["es2015", "react"]
                    }   
                }
            }
        ]
    },
    // externals: [nodeExternals()],
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