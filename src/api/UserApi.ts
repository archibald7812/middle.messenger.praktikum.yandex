import { Methods, request } from '../utils/request';

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
