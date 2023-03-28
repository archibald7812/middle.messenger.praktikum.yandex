import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const ChangeData = () => {

	const parameters = {
		userData: [
			{
				title: "Почта",
				value: "pochta@yandex.ru"
			},
			{
				title: "Логин",
				value: "ivanivanov"
			},
			{
				title: "Имя",
				value: "Иван"
			},
			{
				title: "Фамилия",
				value: "Иванов"
			},
			{
				title: "Имя в чате",
				value: "Иван"
			},
			{
				title: "Телефон",
				value: "+7 (909) 967 30 30"
			},
		],
		pathData: [
			{
				type: '<button>Сохранить</button>',
			},
		],
		button: "button",
		avatar: '<input type="file"/>',

	}

	return Handlebars.compile(templ)(parameters)
}