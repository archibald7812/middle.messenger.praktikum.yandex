import { tmpl } from "./tmpl"
import Handlebars from "handlebars";

export const NavBar = () => {
	Handlebars.registerHelper('getJsonContext', function (data, options) {
		return options.fn(JSON.parse(data));
	});
	Handlebars.registerPartial('NavBar', tmpl)
}
