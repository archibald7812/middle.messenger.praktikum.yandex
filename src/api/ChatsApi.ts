import { Methods, request } from '../utils/request';

export const getChats = () => {
	return request({ method: Methods.GET, url: '/chats', query: { limit: 30 } })
};

export const createChat = (value: string) => {
	return request({ method: Methods.POST, url: '/chats', payload: { title: value } })
};

export const getToken = (chatId: number) => {
	return request({ method: Methods.POST, url: `/chats/token/${chatId}` })
}

export const addUsersToChat = (users: string, chatId: number) => {
	return request({ method: Methods.PUT, url: `/chats/users`, payload: { chatId: chatId, users: [users] } })
}

export const removeUsersFromChat = (users: string, chatId: number) => {
	return request({ method: Methods.DELETE, url: `/chats/users`, payload: { chatId: chatId, users: [users] } })
}

export const deleteChat = (chatId: number) => {
	return request({ method: Methods.DELETE, url: '/chats', payload: { chatId: chatId } })
};
