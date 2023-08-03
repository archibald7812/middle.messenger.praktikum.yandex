import { Methods, request } from '../utils/request';
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

export const updateUserData = ({ payload }: { payload: any }) => {
	return request({ method: Methods.PUT, url: '/user/profile', payload })
};

export const updateUserAvatar = ({ payload }: { payload: any }) => {
	return request({ method: Methods.PUT, url: '/user/profile/avatar', payload })
};

export const updateUserPassword = ({ payload }: { payload: any }) => {
	return request({ method: Methods.PUT, url: '/user/password', payload })
};

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
};