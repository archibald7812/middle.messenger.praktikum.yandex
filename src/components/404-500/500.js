import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const Error500 = () => {

	const parameters = {
		error: "Уже чиним!"
	}

	return Handlebars.compile(templ)(parameters)
}