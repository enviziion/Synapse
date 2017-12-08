module.exports = {
	entry: "./app",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
	},
	watch: true,
	module: {
		rules: [{
			test: /\.worker\.js$/,
			use: {
				loader: 'worker-loader'
			}
		}]
	}
}