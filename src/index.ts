import './reset.css';
import './index.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { Error404 } from './pages/404/404';
import { Error500 } from './pages/500/500';
import { ChangeProfileDataPage } from './pages/ChangeProfileDataPage/ChangeProfileDataPage';
import { ChangeProfilePasswordPage } from './pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';
import { ChatsPage } from './pages/ChatsPage/ChatsPage';
import { router } from './utils/Router/Router';
import Store from './utils/Store/store';
import { getUserData } from './api/AuthApi';
import { addUserData } from './utils/Store/actions';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

interface CustomWindow extends Window {
	AppStore?: Store;
}
declare let window: CustomWindow;

window.AppStore = new Store();

const test = async () => {
	const userDataResponse = await getUserData();
	const userData = await userDataResponse.response;
	const userResult = JSON.parse(userData);
	if (userResult.reason === 'Cookie is not valid') return
	addUserData(userData);
	router.go({ pathname: '/profile' });
}

test()

window.addEventListener('DOMContentLoaded', () => {
	router
		.use({ pathname: '/', RouteBlock: LoginPage })
		.use({ pathname: '/log-in', RouteBlock: LoginPage })
		.use({ pathname: '/registration', RouteBlock: RegistrationPage })
		.use({ pathname: '/500', RouteBlock: Error500 })
		.use({ pathname: '/404', RouteBlock: Error404 })
		.use({ pathname: '/new-password', RouteBlock: ChangeProfilePasswordPage })
		.use({ pathname: '/settings', RouteBlock: ChangeProfileDataPage })
		.use({ pathname: '/messenger', RouteBlock: ChatsPage })
		.use({ pathname: '/profile', RouteBlock: ProfilePage })
		.start();
});
