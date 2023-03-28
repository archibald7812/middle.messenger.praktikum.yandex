import styles from './index.module.css'

const tabs = [
	{
		label: "Вход",
		link: "log-in"
	},
	{
		label: "Регистрация",
		link: "registration"
	},
	{
		label: "Профиль",
		link: "profile"
	},
	{
		label: "Чаты",
		link: "chats"
	},
	{
		label: "404",
		link: "404"
	},
	{
		label: "500",
		link: "500"
	}
]

export const tmpl = `
<div class="${styles.root}">
	<ul>
	{{#getJsonContext '${JSON.stringify(tabs)}'}}
		{{#each this}}
			<div>	
				<li><a href='/{{link}}'>{{label}}</a></li>
			</div>
		{{/each}}
	{{/getJsonContext}}
	</ul>
</div>
`