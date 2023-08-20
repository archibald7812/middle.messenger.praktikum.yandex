import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { StoreState, withStore } from '../../utils/Store/store';
import { getLabel } from '../ProfilePage/ProfilePage';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

const profile = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone', 'id'];

export class BaseChangeProfileDataPage extends Block {
	setProps(nextProps: any): void {
		super.setProps(nextProps);

		const props = { ...this.props };

		for (const key of profile) {
			this.children[key].setProps({ value: props[key] });
		}
	}

	init() {
		this.children.navigation = new NavBar();

		for (const key of profile) {
			this.children[key] = new Input({
				name: key,
				label: getLabel(key),
				placeholder: this.props[key],
				value: this.props[key],
				events: {
				},
			});
		}

		this.children.button = new Button({
			title: 'Сохранить данные',
			type: 'submit',
			events: {
				click: async (e: MouseEvent) => {
					const data = (this.children.button as Button).getFormData(e);
					try {
						await UserController.updateUserData(data);
						await AuthController.fetchUser();
					} catch (e) {
						console.log(e);
					}
				},
			},
		});

		this.children.avatarButton = new Button({
			title: 'Сохранить аватар',
			type: 'submit',
			events: {
				click: async (e: MouseEvent) => {
					e.preventDefault();
					const form = (e.target as HTMLButtonElement).closest('form') as HTMLFormElement;
					const fileInput = form.elements[0] as HTMLInputElement;
					if (!fileInput.files) return;
					const avatar = fileInput.files[0];
					const data = new FormData();
					data.append('avatar', avatar, avatar.name);
					try {
						await UserController.updateUserAvatar(data);
						await AuthController.fetchUser();
					} catch (e) {
						console.log(e);
					}
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: StoreState) {
	return { ...state.authorizedUserData };
}

export const ChangeProfileDataPage = withStore(mapStateToProps)(BaseChangeProfileDataPage);
