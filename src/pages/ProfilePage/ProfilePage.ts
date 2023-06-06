/* eslint-disable no-restricted-syntax */
import Store from '../../utils/Store/store';
import { signOut } from '../../api/AuthApi';
import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Link } from '../../components/Link/Link';
import { Avatar } from '../../components/Avatar/Avatar';

const store = new Store();

const state = store.getState();

const userData = state.authorizedUserData;

const inputs = [
	{
		title: 'Почта',
		value: userData?.email,
		disabled: 'disabled',
		name: 'email',
	},
	{
		title: 'Логин',
		value: userData?.login,
		disabled: 'disabled',
		name: 'login',
	},
	{
		title: 'Имя',
		value: userData?.first_name,
		disabled: 'disabled',
		name: 'first_name',
	},
	{
		title: 'Фамилия',
		value: userData?.second_name,
		disabled: 'disabled',
		name: 'second_name',
	},
	{
		title: 'Имя в чате',
		value: userData?.display_name ?? 'Нет',
		disabled: 'disabled',
		name: 'display_name',
	},
	{
		title: 'Телефон',
		value: userData?.phone,
		disabled: 'disabled',
		name: 'phone',
	},
];

export class ProfilePage extends Block {
	constructor() {
		super({});
	}

	setProps(newProps: any) {
		super.setProps(newProps);
		this.dispatchComponentDidMount();
	}
	/* setProps = (newProps: any) => {
		super.setProps(newProps);
		console.log('newProps', newProps);
		for (const key in newProps) {
			if (key === 'avatar') {
				this.children[key] = new Avatar({
					tag: '',
					name: newProps.login,
				});
			} else {
				this.children[key] = new Input({
					name: key,
					label: key,
					disabled: 'disabled',
					placeholder: newProps[key],
					events: {
					},
				});
			}
		}
		console.log(5, super.setProps);

		this.componentDidMount();
	}; */

	init() {
		this.children.navigation = new NavBar();

		/* this.children.avatar = new Avatar({
			tag: '',
			name: 'Иван',
		}); */

		/* inputs.forEach((input) => {
			this.children[input.name] = new Input({
				name: input.name,
				label: input.title,
				disabled: input.disabled,
				placeholder: input.value,
				events: {
				},
			});
		}); */

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
			events: {
				click: () => {
					signOut();
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
