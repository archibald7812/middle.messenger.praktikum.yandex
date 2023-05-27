/* eslint-disable no-undef */
/* eslint-disable global-require */
const postcssModules = require('postcss-modules');
const fs = require('fs');

module.exports = {
	syntax: 'postcss-scss',
	plugins: [
		require('postcss-nested'),
		require('postcss-simple-vars'),
		postcssModules({
			getJSON(cssFileName, json) {
				const cssName = cssFileName.replace('.css', '.scss');
				const jsonFileName = `${cssName}.json`;
				fs.writeFileSync(jsonFileName, JSON.stringify(json));
			},
		})
	],
};
