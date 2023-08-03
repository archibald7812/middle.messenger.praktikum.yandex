import { UserAPI } from '../api/UserApi';

class UserController {
	private api = new UserAPI();

	async updateUserData(data: unknown) {
		try {
			await this.api.updateUserData(data);

		} catch (error) {
			console.log(error);
		}
	}

	async updateUserAvatar(data: unknown) {
		try {
			await this.api.updateUserAvatar(data);

		} catch (error) {
			console.log(error);
		}
	}

	async updateUserPassword(data: unknown) {
		try {
			await this.api.updateUserPassword(data);

		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserController();