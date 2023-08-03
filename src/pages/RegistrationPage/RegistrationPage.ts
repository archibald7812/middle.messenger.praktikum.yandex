import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import AuthController from '../../controllers/AuthController';

const inputs = [
	{
		title: 'Имя',
		type: 'text',
		name: 'first_name',
	},
	{
		title: 'Фамилия',
		type: 'text',
		name: 'second_name',
	},
	{
		title: 'Логин',
		type: 'text',
		name: 'login',
	},
	{
		title: 'Email',
		type: 'email',
		name: 'email',
	},
	{
		title: 'Телефон',
		type: 'tel',
		name: 'phone',
	},
	{
		title: 'Пароль',
		type: 'password',
		name: 'password',
	},
	{
		title: 'Повторите пароль',
		type: 'password',
		name: 'repeat_password',
	},
];

export class RegistrationPage extends Block {
	constructor() {
		super({});
	}

	init() {
		inputs.forEach((input) => {
			this.children[input.name] = new Input({
				name: input.name,
				type: input.type,
				label: input.title,
				events: {
					input: () => {
						(this.children[input.name] as Input).isValid();
					},
					focusout: () => {
						(this.children[input.name] as Input).isValid();
					},
				},
			});
		});

		this.children.navigation = new NavBar();

		this.children.button = new Button({
			title: 'Регистрация',
			type: 'submit',
			events: {
				click: (e: MouseEvent) => {
					try {
						const data = (this.children.button as Button).getFormData(e);
						if (!data) return;
						AuthController.signup(data)
					} catch (e) {
						console.log(e)
					}

				},
			},
		});

		this.children.link = new Link({
			title: 'Уже есть аккаунт?',
			to: '/log-in',
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
