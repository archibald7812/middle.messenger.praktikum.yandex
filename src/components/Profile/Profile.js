import Handlebars from "handlebars";
import { templ } from "./tmpl";

export const Profile = () => {
	const parameters = {
		name: "Иван",
		userData: [
			{
				title: "Почта",
				value: "pochta@yandex.ru",
				disabled: "disabled",
				name: "email"
			},
			{
				title: "Логин",
				value: "ivanivanov",
				disabled: "disabled",
				name: "login"
			},
			{
				title: "Имя",
				value: "Иван",
				disabled: "disabled",
				name: "first_name"
			},
			{
				title: "Фамилия",
				value: "Иванов",
				disabled: "disabled",
				name: "second_name"
			},
			{
				title: "Имя в чате",
				value: "Иван",
				disabled: "disabled",
				name: "display_name"
			},
			{
				title: "Телефон",
				value: "+7 (909) 967 30 30",
				disabled: "disabled",
				name: "phone"
			},
		],
		pathData: [
			{
				title: "Изменить данные",
				link: "new-data",
				type: "<a href='/new-data'>Изменить данные</a>"
			},
			{
				title: "Изменить пароль",
				link: "new-password",
				type: '<a href="/new-password">Изменить пароль</a>'
			},
			{
				type: `<a href="/">Выйти</a>`
			},
		],
		avatar: '<div></div>'
	}

	return Handlebars.compile(templ)(parameters)
}
