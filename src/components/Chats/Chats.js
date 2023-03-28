import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const Chats = () => {

	return Handlebars.compile(templ)()
}