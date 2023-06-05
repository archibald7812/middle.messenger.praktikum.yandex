import './reset.css';
import './index.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { Error404 } from './pages/404/404';
import { Error500 } from './pages/500/500';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ChangeProfileDataPage } from './pages/ChangeProfileDataPage/ChangeProfileDataPage';
import { ChangeProfilePasswordPage } from './pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';
import { ChatsPage } from './pages/ChatsPage/ChatsPage';
import { router } from './utils/Router/Router';

window.addEventListener('DOMContentLoaded', () => {
	router
		.use({ pathname: '/', RouteBlock: LoginPage })
		.use({ pathname: '/log-in', RouteBlock: LoginPage })
		.use({ pathname: '/registration', RouteBlock: RegistrationPage })
		.use({ pathname: '/500', RouteBlock: Error500 })
		.use({ pathname: '/404', RouteBlock: Error404 })
		.use({ pathname: '/new-password', RouteBlock: ChangeProfilePasswordPage })
		.use({ pathname: '/new-data', RouteBlock: ChangeProfileDataPage })
		.use({ pathname: '/chats', RouteBlock: ChatsPage })
		.use({ pathname: '/profile', RouteBlock: ProfilePage })
		.start();
});
