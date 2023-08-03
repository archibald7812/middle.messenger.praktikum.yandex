import { Socket } from '../Socket';
import Store, { Chat, Message } from './store';

export const store = new Store();

export const addUserData = (userData: any) => {
	store.set('authorizedUserData', userData);
};

export const addChat = (chatsData: any) => {
	store.set(`chats`, chatsData);
};

export const setActiveChat = (chat: Chat) => {
	store.set('activeChat', chat)
	store.set('activeChaMessages', [])
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

export const addOldMessages = (messages: Message[]) => {
	store.set('activeChaMessages', messages)
}

export const deleteChatFromStore = (chatId: number) => {
	const chats = store.getState().chats?.filter(chat => chat.id !== chatId)
	store.set(`chats`, chats);
}
