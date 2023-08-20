import { API } from './api';

export type IUser = {
	id: number
	first_name: string
	second_name: string
	display_name: string | null
	login: string
	avatar: string | null
	email: string
	phone: string
}

export class AuthAPI extends API {
	constructor() {
		super('/auth');
	}

	signin(data: unknown): Promise<void> {
		return this.http.post('/signin', data);
	}

	signup(data: unknown): Promise<void> {
		return this.http.post('/signup', data);
	}

	logout(): Promise<void> {
		return this.http.post('/logout');
	}

	getUser(): Promise<IUser> {
		return this.http.get('/user');
	}
}
