const postcssModules = require('postcss-modules');

module.exports = {
	syntax: 'postcss-scss',
	plugins: [
		require('postcss-nested'),
		postcssModules({
			getJSON: function (cssFileName, json) {
				const cssName = cssFileName.replace('.css', '.scss');
				const jsonFileName = cssName + '.json';
				fs.writeFileSync(jsonFileName, JSON.stringify(json));
			}
		})
	]
}