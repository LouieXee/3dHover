var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/assets/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader", "autoprefixer-loader?browsers=last 2 version")
			},
			{
		        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
		        exclude: /node_modules/,
		        loader: 'url-loader?limit=10000',
		    },
		    {
		    	test: /\.html$/,
		        exclude: /node_modules/,
		        loader: 'raw-loader',
		    }
		]
	},
	plugins: [
		new ExtractTextPlugin("bundle.css"),
		new webpack.ProvidePlugin({
			"$": "jquery"
		})
	]
};
