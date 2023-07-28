import { Socket } from '../Socket';
import Store, { IChat, IMessage } from './store';

export const store = new Store();

export const addUserData = (userData: any) => {
	userData = JSON.parse(userData);
	store.set('authorizedUserData', userData);
};

export const addChat = (chatsData: any) => {
	store.set(`chats`, chatsData);
};

export const setActiveChat = (chat: IChat) => {
	store.set('activeChat', chat)
	store.set('activeChaIMessages', [])
}

export const setStoreToInitState = () => {
	store.removeState()
}

export const setActiveSocket = (socket: Socket) => {
	store.set('activeSocket', socket)
}

export const clearSocket = () => {
	store.getState().activeSocket?.closeSocket()
}

export const getActiveSocket = () => {
	return store.getState().activeSocket
}

export const addOldMessages = (messages: IMessage[]) => {
	store.set('activeChaIMessages', messages)
}
