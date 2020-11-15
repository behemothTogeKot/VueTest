const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},

	devServer: {
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		// new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: "./index.html" }),

		new VueLoaderPlugin(),
	],
};
