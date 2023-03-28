import { tmpl } from "./tmpl"
import Handlebars from "handlebars";

export const BackButton = () => {
	Handlebars.registerPartial('BackButton', tmpl)
}