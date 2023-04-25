import styles from './index.module.css';

const tabs = [
	{
		label: 'Вход',
		link: 'log-in',
	},
	{
		label: 'Регистрация',
		link: 'registration',
	},
	{
		label: 'Профиль',
		link: 'profile',
	},
	{
		label: 'Чаты',
		link: 'chats',
	},
	{
		label: '404',
		link: '404',
	},
	{
		label: '500',
		link: '500',
	},
];

export const tmpl = `
	<header class="${styles.root}">
		<nav>
			<ul>
				${tabs
		.map((tab) => (`
						<div>
							<li><a href='/${tab.link}'>${tab.label}</a></li>
						</div>`))
		.join('')}
			</ul>
		</nav>
	</header>`;
