import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const Registration = () => {

	const parameters = {
		title: "Регистрация",
		inputs: [
			{
				title: "Имя",
				type: "text",
				name: "first_name"
			},
			{
				title: "Фамилия",
				type: "text",
				name: "second_name"
			},
			{
				title: "Логин",
				type: "text",
				name: "login"
			},
			{
				title: "Email",
				type: "email",
				name: "email"
			},
			{
				title: "Телефон",
				type: "tel",
				name: "phone"
			},
			{
				title: "Пароль",
				type: "password",
				name: "password"
			},
			{
				title: "Повторите пароль",
				type: "password",
				name: "password"
			}
		],
		buttonTitle: "Регистрация",
		linkTitle: "Уже есть аккаунт?",
		link: "log-in"
	}

	return Handlebars.compile(templ)(parameters)
}