import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { IStoreState, withStore } from 'src/utils/Store/store';
import { getLabel } from '../ProfilePage/ProfilePage';
import { updateUserAvatar, updateUserData } from 'src/api/UserApi';
import { getUserData } from 'src/api/AuthApi';
import { addUserData } from 'src/utils/Store/actions';
import { router } from 'src/utils/Router/Router';

const inputs = [
	{
		title: 'Почта',
		value: 'pochta@yandex.ru',
		name: 'email',
		type: 'email',
	},
	{
		title: 'Логин',
		value: 'ivanivanov',
		name: 'login',
		type: 'text',
	},
	{
		title: 'Имя',
		value: 'Иван',
		name: 'first_name',
		type: 'text',
	},
	{
		title: 'Фамилия',
		value: 'Иванов',
		name: 'second_name',
		type: 'text',
	},
	{
		title: 'Имя в чате',
		value: 'Иван',
		name: 'display_name',
		type: 'text',
	},
	{
		title: 'Телефон',
		value: '+7 (909) 967 30 30',
		name: 'phone',
		type: 'tel',
	},
];

const profile = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone', 'id']

export class BaseChangeProfileDataPage extends Block {

	setProps(nextProps: any): void {
		super.setProps(nextProps)

		const props = { ...this.props }

		for (const key of profile) {
			this.children[key].setProps({ value: props[key] })
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
				click: async (e) => {
					const data = (this.children.button as Button).getFormData(e);
					const response = await updateUserData({ payload: data })
					const isOK = response.status;
					if (isOK === 200) {
						const userDataResponse = await getUserData();
						const userData = await userDataResponse.response;
						addUserData(userData);
						router.go({ pathname: '/profile' });
					}
				},
			},
		});

		this.children.avatarButton = new Button({
			title: 'Сохранить аватар',
			type: 'submit',
			events: {
				click: async (e) => {
					e.preventDefault()
					const form = (e.target as HTMLButtonElement).closest('form') as HTMLFormElement;
					const fileInput = form.elements[0] as HTMLInputElement;
					if (!fileInput.files) return
					const avatar = fileInput.files[0]
					const data = new FormData();
					data.append("avatar", avatar, avatar.name)
					const response = await updateUserAvatar({ payload: data })
					const isOK = response.status;
					if (isOK === 200) {
						const userDataResponse = await getUserData();
						const userData = await userDataResponse.response;
						addUserData(userData);
						router.go({ pathname: '/profile' });
					}
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { ...state.authorizedUserData };
}

export const ChangeProfileDataPage = withStore(mapStateToProps)(BaseChangeProfileDataPage);

