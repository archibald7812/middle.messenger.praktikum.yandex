import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { Avatar } from '../../components/Avatar/Avatar';
import { IStoreState, withStore } from 'src/utils/Store/store';

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
export class BaseChangeProfileDataPage extends Block {

	init() {
		this.children.navigation = new NavBar();

		inputs.forEach((input) => {
			this.children[input.name] = new Input({
				name: input.name,
				label: input.title,
				placeholder: input.value,
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

function mapStateToProps(state: IStoreState) {
	return { ...state.authorizedUserData };
}

export const ChangeProfileDataPage = withStore(mapStateToProps)(BaseChangeProfileDataPage);

