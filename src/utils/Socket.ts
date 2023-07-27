import { addOldMessages, store } from "./Store/actions";
import { IStoreState } from "./Store/store";

export class Socket {
	state: IStoreState
	chatId: number | undefined
	token: number | undefined
	userId: number | undefined
	socket: WebSocket

	constructor() {

		this.state = store.getState()
		this.chatId = this.state.activeChat?.id
		this.token = this.state.activeChat?.token
		this.userId = this.state.authorizedUserData?.id
		this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);

		this.socket.addEventListener('open', async () => {
			console.log('Соединение установлено');
			this.getOld('0')
		});

		this.socket.addEventListener('close', event => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}

			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});

		this.socket.addEventListener('message', event => {
			const newMessages = JSON.parse(event.data)
			if (newMessages.type === 'user connected') return
			console.log(newMessages)
			const oldMessages = this.state.activeChaIMessages ?? []
			Array.isArray(newMessages) ?
				oldMessages?.push(...newMessages) :
				oldMessages?.push(newMessages)
			console.log(5, newMessages)
			console.log(6, oldMessages)
			addOldMessages(oldMessages)
		});

		this.socket.addEventListener('error', error => {
			console.log('Ошибка', error);
		});
	}

	sendMessage(message: string) {
		this.socket.send(JSON.stringify({
			content: message,
			type: 'message',
		}))
	}

	closeSocket() {
		this.socket.close()
	}

	getOld(offest: string = '0'): any {
		this.socket.send(JSON.stringify({
			content: offest,
			type: 'get old',
		}))
	}
}