import { ChatsAPI } from '../api/ChatsApi';
import { addChat } from '../utils/Store/actions';

class ChatsController {
	private api = new ChatsAPI();

	async getChats() {
		try {
			const chats = await this.api.getChats();

			addChat(chats);

		} catch (error) {
			console.log(error);
		}
	}

	async createChat(title: string) {
		try {
			await this.api.createChat(title);

		} catch (error) {
			console.log(error);
		}
	}

	async getToken(chatId: number) {
		try {
			const token = await this.api.getToken(chatId);
			return token
		} catch (error) {
			console.log(error);
		}
	}

	async deleteChat(chatId: number) {
		try {
			await this.api.deleteChat(chatId);

		} catch (error) {
			throw error;
		}
	}

	async addUsersToChat(users: string, chatId: number) {
		try {
			await this.api.addUsersToChat(users, chatId);

		} catch (error) {
			throw error;
		}
	}

	async removeUsersToChat(users: string, chatId: number) {
		try {
			await this.api.removeUsersFromChat(users, chatId);

		} catch (error) {
			throw error;
		}
	}
}

export default new ChatsController();