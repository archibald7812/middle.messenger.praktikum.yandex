import { Methods, request } from '../utils/request';

export type ISignUpPayload = {
	email: string
	first_name: string
	login: string
	password: string
	phone: string
	second_name: string
}

export type ISignInPayload = {
	login: string
	password: string
}

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

export const signUp = ({ payload }: { payload: any }) => request({ method: Methods.POST, url: '/auth/signup', payload });

export const signIn = ({ payload }: { payload: any }) => request({ method: Methods.POST, url: '/auth/signin', payload });

export const signOut = () => {
	request({ method: Methods.POST, url: '/auth/logout' });
};

export const getUserData = () => request({ method: Methods.GET, url: '/auth/user' });

/* export class AuthAPI extends API {
	constructor() {
		super('/auth');
	}

	signin({ payload }: { payload: any }): Promise<void> {
		const data = payload
		return this.http.post('/signin', data);
	}

	signup({ payload }: { payload: any }): Promise<void> {
		const data = payload
		return this.http.post('/signup', data);
	}

	logout(): Promise<void> {
		return this.http.post('/logout');
	}

	getUser(): Promise<IUser> {
		return this.http.get('/user');
	}
}; */