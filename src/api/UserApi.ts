import { API } from './api';

export type IUser = {
	id?: number
	first_name: string
	second_name: string
	display_name: string | null
	login: string
	avatar?: string | null
	email: string
	phone: string
}

export class UserAPI extends API {
	constructor() {
		super('/user');
	}

	updateUserData(data: unknown): Promise<void> {
		return this.http.put('/profile', data);
	}

	updateUserAvatar(data: unknown): Promise<void> {
		return this.http.put('/profile/avatar', data);
	}

	updateUserPassword(data: unknown): Promise<void> {
		return this.http.put('/password', data);
	}
}
