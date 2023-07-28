import { Input } from '../../components/Input/Input';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Button } from '../../components/Button/Button';
import { getLabel } from '../ProfilePage/ProfilePage';
import { updateUserPassword } from '../../api/UserApi';
import { getUserData } from '../../api/AuthApi';
import { addUserData } from '../../utils/Store/actions';
import { router } from '../../utils/Router/Router';


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
				click: async (e) => {
					const data = (this.children.button as Button).getFormData(e);
					console.log(data)
					const response = await updateUserPassword({ payload: data })
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
