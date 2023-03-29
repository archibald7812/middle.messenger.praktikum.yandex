import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const Error404 = () => {

	const parameters = {
		error: "Не туда попали("
	}

	return Handlebars.compile(templ)(parameters)
}
