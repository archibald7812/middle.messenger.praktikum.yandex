import { Methods, request } from '../utils/request';

export const getChats = () => {
	return request({ method: Methods.GET, url: '/chats' })
};

export const createChat = (value: string) => {
	return request({ method: Methods.POST, url: '/chats', payload: { title: value } })
};

