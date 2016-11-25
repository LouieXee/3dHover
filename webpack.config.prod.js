var webpack = require("webpack");
var webpackConfig = require("./webpack.config.base.js");

webpackConfig.plugins.push(
	new webpack.DefinePlugin({
	    PRODUCTION: true,
	})
)

module.exports = webpackConfig;