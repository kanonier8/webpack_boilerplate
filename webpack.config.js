'use strict';

// switch dev and prod mode
const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');

module.exports = {

	entry: './index.js',

	output: {
		filename: 'bundle.js',
		// export global variable
		library: 'main'
	},

	// watcher webpack
	watch: NODE_ENV == 'dev',
	watchOptions: {
		// delay before rebuild app
		aggregateTimeout: 300
	},

	devtool: NODE_ENV == 'dev' ? 'cheap-inline-module-source-map' : null,

	plugins: [],

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					// plugins: ['transform-runtime'],
					presets: ['es2015', 'stage-0', 'react'],
				}
			},
			{
				test: /\index.styl/,
				loader: 'style-loader!css-loader!stylus-loader'
			}
		]
	}

};

if(NODE_ENV == 'prod') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	)
}