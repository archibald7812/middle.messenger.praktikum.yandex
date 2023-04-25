import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { Error404 } from './pages/404/404';
import { Error500 } from './pages/500/500';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ChangeProfileDataPage } from './pages/ChangeProfileDataPage/ChangeProfileDataPage';
import { ChangeProfilePasswordPage } from './pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';
import { ChatsPage } from './pages/ChatsPage/ChatsPage';

export function App() {
	switch (window.location.pathname) {
		case '/log-in':
			return new LoginPage();
		case '/registration':
			return new RegistrationPage();
		case '/profile':
			return new ProfilePage();
		case '/new-password':
			return new ChangeProfilePasswordPage();
		case '/new-data':
			return new ChangeProfileDataPage();
		case '/chats':
			return new ChatsPage();
		case '/404':
			return new Error404();
		case '/500':
			return new Error500();
		default:
			return new LoginPage();
	}
}
