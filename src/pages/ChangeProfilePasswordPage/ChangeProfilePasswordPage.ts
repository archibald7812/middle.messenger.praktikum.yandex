import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { getLabel } from '../ProfilePage/ProfilePage';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

const passwords = ['oldPassword', 'newPassword']

export class ChangeProfilePasswordPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.navigation = new NavBar();

		for (const key of passwords) {
			this.children[key] = new Input({
				name: key,
				label: getLabel(key),
				placeholder: '*******',
				events: {
				},
			});
		}

		this.children.button = new Button({
			title: 'Сохранить',
			type: 'submit',
			events: {
				click: async (e: MouseEvent) => {
					const data = (this.children.button as Button).getFormData(e);
					try {
						UserController.updateUserPassword(data)
						AuthController.fetchUser()
					} catch (e) {
						console.log(e)
					}
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
