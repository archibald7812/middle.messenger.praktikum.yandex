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
import { setStoreToInitState } from 'src/utils/Store/actions';

export const getLabel = (key: any): string => {
	switch (key) {
		case 'email': return 'Почта'
		case 'login': return 'Логин'
		case 'first_name': return 'Имя'
		case 'second_name': return 'Фамилия'
		case 'display_name': return 'Имя в чате'
		case 'phone': return 'Телефон'
		case 'oldPassword': return 'Старый пароль'
		case 'newPassword': return 'Новый пароль'
		default: return ''
	}
}

const profile = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone', 'avatar', 'id']

export class BaseProfilePage extends Block {

	setProps(nextProps: any): void {
		super.setProps(nextProps)

		const props = { ...this.props }

		for (const key in props) {
			if (key === 'avatar') this.children.avatar.setProps({ src: props[key] })
			else this.children[key].setProps({ placeholder: props[key] })
		}

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
					setStoreToInitState()
					const propsKeys: any = {}
					profile.forEach(name => {
						propsKeys[name] = null
					})
					this.setProps(propsKeys)
				},
			},
		});

		for (const key of profile) {
			if (key === 'avatar') {
				this.children.avatar = new Avatar({
					src: this.props.avatar,
					tag: '',
				})
			} else {
				this.children[key] = new Input({
					name: key,
					label: getLabel(key),
					disabled: 'disabled',
					placeholder: this.props[key],
					events: {
					},
				});
			}
		}
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { ...state.authorizedUserData };
}

export const ProfilePage = withStore(mapStateToProps)(BaseProfilePage);
