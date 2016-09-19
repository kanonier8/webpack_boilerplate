'use strict';

import webpack from 'webpack';
import path from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

// switch dev and prod mode
const NODE_ENV = process.env.NODE_ENV || 'dev';

export default {

	context: path.join(__dirname, '/source'),
	entry: './main',
	output: {
		path: path.join(__dirname, 'dist'),
		// export global variable
		filename: '[name].js',
		library: '_global'
	},

	// watcher webpack
	watch: NODE_ENV == 'dev',
	watchOptions: {
		// delay before rebuild app
		aggregateTimeout: 300
	},

	devtool: NODE_ENV == 'dev' ? 'cheap-inline-module-source-map' : null,

	// plugins: [],

	// resolve: {
	// 	modulesDirectories: [__dirname + '/node_modules']
	// },

	plugins: [
			new BrowserSyncPlugin({
				// browse to http://localhost:3000/ during development, 
				// ./public directory is being served 
				host: 'localhost',
				port: 3000,
				server: { baseDir: ['dist'] }
			})
		],

	module: {
		loaders: [
			{ // loader for all JSX 
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react'],
				}
			},
			{ // loader for all JS files and JSX files
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
				}
			}, {// loader for STYLUS files
				test: /\.styl/,
				loader: 'style!css!postcss!stylus?resolve url'
			}, { // loader for PUG(JADE) files
				test: /\.pug$/,
				loader: 'pug'
			}, { // loader for CSS files
				test: /\.css$/,
				loader: 'style!css'
			}, {
				test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
				exclude: '/\node_modules\//',
				loader: 'url',
				query: {
					name: '[path][name].[ext]',
					limit: 10240
				}
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