import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const ChangePassword = () => {
	const parameters = {
		userData: [
			{
				title: "Старый пароль",
				value: "********",
				disabled: "disabled",
				name: "password"
			},
			{
				title: "Новый пароль",
				value: "**********",
				name: "password"
			},
			{
				title: "Повторите новый пароль",
				value: "**********",
				name: "password"
			}
		],
		pathData: [
			{
				type: '<button type="submit">Сохранить</button>'
			},
		],
		button: "button",
		avatar: '<div></div>'
	}

	return Handlebars.compile(templ)(parameters)
}
