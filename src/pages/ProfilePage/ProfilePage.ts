import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import { Avatar } from '../../components/Avatar/Avatar';

const inputs = [
	{
		title: 'Почта',
		value: 'pochta@yandex.ru',
		disabled: 'disabled',
		name: 'email',
	},
	{
		title: 'Логин',
		value: 'ivanivanov',
		disabled: 'disabled',
		name: 'login',
	},
	{
		title: 'Имя',
		value: 'Иван',
		disabled: 'disabled',
		name: 'first_name',
	},
	{
		title: 'Фамилия',
		value: 'Иванов',
		disabled: 'disabled',
		name: 'second_name',
	},
	{
		title: 'Имя в чате',
		value: 'Иван',
		disabled: 'disabled',
		name: 'display_name',
	},
	{
		title: 'Телефон',
		value: '+7 (909) 967 30 30',
		disabled: 'disabled',
		name: 'phone',
	},
];

export class ProfilePage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.navigation = new NavBar();

		this.children.avatar = new Avatar({
			tag: '',
			name: 'Иван',
		});

		inputs.forEach((input) => {
			this.children[input.name] = new Input({
				name: input.name,
				label: input.title,
				disabled: input.disabled,
				placeholder: input.value,
				events: {
				},
			});
		});

		this.children.changeData = new Link({
			title: 'Изменить данные',
			to: '/new-data',
		});

		this.children.changePassword = new Link({
			title: 'Изменить пароль',
			to: '/new-password',
		});

		this.children.exit = new Link({
			title: 'Выход',
			to: '/log-in',
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
