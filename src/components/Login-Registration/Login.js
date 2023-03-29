import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const Login = () => {

	const parameters = {
		title: "Вход",
		inputs: [
			{
				title: "Логин",
				type: "text",
				name: "login"
			},
			{
				title: "Пароль",
				type: "password",
				name: "password"
			}
		],
		buttonTitle: "Вход",
		linkTitle: "Еще нет аккаунта?",
		link: "registration"
	}

	return Handlebars.compile(templ)(parameters)
}
