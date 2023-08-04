import { API } from './api';

export class ChatsAPI extends API {
	constructor() {
		super('/chats');
	}

	getChats(): Promise<void> {
		return this.http.get('/', { limit: 30 });
	}

	createChat(title: string) {
		return this.http.post('/', { title });
	}

	deleteChat(chatId: number) {
		return this.http.delete('/', { chatId });
	}

	getToken(chatId: number) {
		return this.http.post(`/token/${chatId}`);
	}

	addUsersToChat(users: string, chatId: number) {
		return this.http.put('/users', { chatId, users: [users] });
	}

	removeUsersFromChat(users: string, chatId: number) {
		return this.http.delete('/users', { chatId, users: [users] });
	}
}
