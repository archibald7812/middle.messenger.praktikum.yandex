import { addOldMessages, store } from './Store/actions';
import { StoreState } from './Store/store';

export class Socket {
	state: StoreState;

	chatId: number | undefined;

	token: number | undefined;

	userId: number | undefined;

	socket: WebSocket;

	constructor() {
		this.state = store.getState();
		this.chatId = this.state.activeChat?.id;
		this.token = this.state.activeChat?.token;
		this.userId = this.state.authorizedUserData?.id;
		this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);

		this.socket.addEventListener('open', async () => {
			console.log('Соединение установлено');
			this.getOld('0');
		});

		this.socket.addEventListener('close', (event) => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});

		this.socket.addEventListener('message', (event) => {
			try {
				const newMessages = JSON.parse(event.data);
				if (newMessages.type === 'user connected') return;
				const oldMessages = this.state.activeChatMessages ?? [];
				Array.isArray(newMessages)
					? oldMessages?.push(...newMessages)
					: oldMessages?.push(newMessages);
				addOldMessages(oldMessages);
			} catch (e) {
				console.log(e);
			}
		});

		this.socket.addEventListener('error', (error) => {
			console.log('Ошибка', error);
		});
	}

	sendMessage(message: string) {
		this.socket.send(JSON.stringify({
			content: message,
			type: 'message',
		}));
	}

	closeSocket() {
		this.socket.close();
	}

	getOld(offest: string = '0'): any {
		this.socket.send(JSON.stringify({
			content: offest,
			type: 'get old',
		}));
	}
}
