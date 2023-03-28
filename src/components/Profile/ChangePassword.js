import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const ChangePassword = () => {
	const parameters = {
		userData: [
			{
				title: "Старый пароль",
				value: "********",
				disabled: "disabled"
			},
			{
				title: "Новый пароль",
				value: "**********"
			},
			{
				title: "Повторите новый пароль",
				value: "**********"
			}
		],
		pathData: [
			{
				type: '<button>Сохранить</button>'
			},
		],
		button: "button",
		avatar: '<div></div>'
	}

	return Handlebars.compile(templ)(parameters)
}