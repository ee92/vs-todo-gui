const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
	{
		mode: 'production',
		target: 'node',
		entry: './extension.ts',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'extension.js',
			libraryTarget: 'commonjs2',
		},
		externals: {
			vscode: 'commonjs vscode',
			fsevents: "require('fsevents')",
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader'
						}
					]
				}
			]
		}
	},
	{
		mode: 'production',
		entry: './src/view/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'build')
		},
		externals: {
			vscode: 'commonjs vscode'
		},
		module: {
			rules: [{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]'
							}
						}
					}
				]
			}]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css'
			})
		]
	}
];