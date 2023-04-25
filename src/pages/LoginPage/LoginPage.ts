import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';

export class LoginPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.login = new Input({
			name: 'login',
			type: 'text',
			label: 'Логин',
			events: {
				input: () => {
					(this.children.login as Input).isValid();
				},
				focusout: () => {
					(this.children.login as Input).isValid();
				},
			},
		});

		this.children.password = new Input({
			name: 'password',
			type: 'password',
			label: 'Пароль',
			events: {
				input: () => {
					(this.children.password as Input).isValid();
				},
				focusout: () => {
					(this.children.password as Input).isValid();
				},
			},
		});

		this.children.navigation = new NavBar();

		this.children.button = new Button({
			title: 'Войти',
			type: 'submit',
			events: {
				click: (e) => {
					(this.children.button as Button).getFormData(e);
				},
			},
		});

		this.children.link = new Link({
			title: 'Еще нет аккаунта?',
			to: '/registration',
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
