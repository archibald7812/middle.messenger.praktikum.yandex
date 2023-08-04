import handlebars from 'vite-plugin-handlebars';

export default {
	plugins: [
		handlebars(),
	],
	server: {
		port: 3000,
	},
};
