import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { Avatar } from '../../components/Avatar/Avatar';

const inputs = [
	{
		title: 'Старый пароль',
		value: 'pochta@yandex.ru',
		name: 'old_password',
		type: 'password',
	},
	{
		title: 'Новый пароль',
		value: 'ivanivanov',
		name: 'password',
		type: 'password',
	},
	{
		title: 'Повторите пароль',
		value: 'ivanivanov',
		name: 'repeat_password',
		type: 'password',
	},
];

export class ChangeProfilePasswordPage extends Block {
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
				placeholder: '**********',
				type: input.type,
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

		this.children.button = new Button({
			title: 'Сохранить',
			type: 'submit',
			events: {
				click: (e) => {
					(this.children.button as Button).getFormData(e);
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
