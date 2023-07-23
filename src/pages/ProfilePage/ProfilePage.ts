/* eslint-disable no-restricted-syntax */
import { IStoreState, withStore } from '../../utils/Store/store';
import { signOut } from '../../api/AuthApi';
import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Link } from '../../components/Link/Link';
import { Avatar } from '../../components/Avatar/Avatar';
import { merge } from 'src/utils/helpers/merge';

const getLabel = (key: any): string => {
	switch (key) {
		case 'email': return 'Почта'
		case 'login': return 'Логин'
		case 'first_name': return 'Имя'
		case 'second_name': return 'Фамилия'
		case 'display_name': return 'Имя в чате'
		case 'phone': return 'Телефон'
		default: return ''
	}
}

const profile = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone', 'avatar', 'id']

export class BaseProfilePage extends Block {

	setProps(nextProps: any): void {
		console.log('setProps', nextProps)
		super.setProps(nextProps)

		this.updateChildren()
	}

	updateChildren() {

		const data: Record<string, any> = {}
		const props: any = {}

		Object.entries(this.props).forEach((item) => {
			data[item[0]] = item[1]
		})

		console.log(1, this.props)
		console.log(2, data)

		for (const key of profile) {
			if (key === 'avatar') {
				props.avatar = new Avatar({
					tag: '',
					name: data[key],
				});
			} else {
				props[key] = new Input({
					name: key,
					label: getLabel(key),
					disabled: 'disabled',
					placeholder: data[key],
					events: {
					},
				});
			}
		}
		this.children = merge(this.children, props)
	}

	init() {
		this.children.navigation = new NavBar();

		this.children.changeData = new Link({
			title: 'Изменить данные',
			to: '/settings',
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

		this.updateChildren()
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { ...state.authorizedUserData };
}

export const ProfilePage = withStore(mapStateToProps)(BaseProfilePage);
