import { AuthAPI } from '../api/AuthApi';
import { router } from '../utils/Router/Router';
import { addUserData, store } from '../utils/Store/actions';

class AuthController {
	private api = new AuthAPI();

	async signin(data: unknown) {
		try {
			await this.api.signin(data);

			await this.fetchUser();

			router.go('/profile');
		} catch (error) {
			console.log(error);
		}
	}

	async signup(data: unknown) {
		try {
			await this.api.signup(data);

			await this.fetchUser();

			router.go('/profile');
		} catch (error) {
			console.log(error);
		}
	}

	async logout() {
		try {
			await this.api.logout();

			store.set('user', undefined);

			router.go('/');
		} catch (error) {
			console.log(error);
		}
	}

	async fetchUser() {
		const user = await this.api.getUser();

		addUserData(user);

		router.go('/profile');
	}
}

export default new AuthController();
