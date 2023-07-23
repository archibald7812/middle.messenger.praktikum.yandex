import { addUserData } from '../../utils/Store/actions';
import { router } from '../../utils/Router/Router';
import { getUserData, signIn } from '../../api/AuthApi';
import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';

const tabs = [
	{
		label: 'Вход',
		link: 'log-in',
	},
	{
		label: 'Регистрация',
		link: 'registration',
	},
];

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
				click: async (e) => {
					const payload = (this.children.button as Button).getFormData(e);
					const response = await signIn({ payload });
					const isAuthOK = await response.response;
					if (isAuthOK === 'OK') {
						const userDataResponse = await getUserData();
						const userData = await userDataResponse.response;
						addUserData(userData);
						router.go({ pathname: '/profile' });
					}
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
