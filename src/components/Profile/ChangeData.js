import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const ChangeData = () => {

	const parameters = {
		userData: [
			{
				title: "Почта",
				value: "pochta@yandex.ru",
				name: "email"
			},
			{
				title: "Логин",
				value: "ivanivanov",
				name: "login"
			},
			{
				title: "Имя",
				value: "Иван",
				name: "first_name"
			},
			{
				title: "Фамилия",
				value: "Иванов",
				name: "second_name"
			},
			{
				title: "Имя в чате",
				value: "Иван",
				name: "display_name"
			},
			{
				title: "Телефон",
				value: "+7 (909) 967 30 30",
				name: "phone"
			},
		],
		pathData: [
			{
				type: '<button type="submit">Сохранить</button>',
			},
		],
		button: "button",
		avatar: '<input type="file" name="avatar"/>',
	}

	return Handlebars.compile(templ)(parameters)
}
