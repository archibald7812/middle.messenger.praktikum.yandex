import { MessagesSection } from '../../components/MessagesSection/MessagesSection';
import { Avatar } from '../../components/Avatar/Avatar';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { InputText } from '../../components/InputText/InputText';
import { getActiveSocket } from '../../utils/Store/actions';
import { StoreState, withStore } from '../../utils/Store/store';
import { ChatsList } from '../../components/ChatsList/ChatsList';
import ChatsController from '../../controllers/ChatsController';

export class BaseChatsPage extends Block {
	setProps(nextProps: any): void {
		super.setProps(nextProps);
	}

	init() {
		this.children.navigation = new NavBar();

		this.children.chatsList = new ChatsList({});

		this.children.avatar = new Avatar({});

		this.children.inputChat = new InputText({
			title: 'Создать чат',
			events: {
				input: (e: any) => {
					e.preventDefault();
					this.children.inputChat.setValue(e.target.value);
				},
			},
		});

		this.children.createChat = new Button({
			title: 'Создать чат',
			type: 'submit',
			events: {
				click: async (e: any) => {
					e.preventDefault();
					const data = this.children.inputChat.getValue();
					try {
						await ChatsController.createChat(data);
						await ChatsController.getChats();
						/* if (createChatResponse.status === 200) {
							const chatsDataResponse = await getChats()
							const chatsData = await chatsDataResponse.response
							const chats = JSON.parse(chatsData)
							const chatPromises = await chats.map(async (chat: any) => {
								const tokenResponse = await getToken(chat.id);
								const token = await JSON.parse(tokenResponse.response);
								const chatWithToken = { ...chat, token: token.token };
								return chatWithToken;
							});
							const chatsWithToken = await Promise.all(chatPromises);

							addChat(chatsWithToken);
						} */
					} catch (e) {
						console.log(e);
					}
				},
			},
		});

		this.children.inputUser = new InputText({
			title: 'Имя пользователя',
			events: {
				input: (e: any) => {
					e.preventDefault();
					this.children.inputChat.setValue(e.target.value);
				},
			},
		});

		this.children.addUser = new Button({
			title: 'Добавить пользователя',
			type: 'submit',
			events: {
				click: async (e: MouseEvent) => {
					e.preventDefault();
					const data = this.children.inputUser.getValue();
					try {
						await ChatsController.addUsersToChat(data, this.props.activeChat.id);
					} catch (e) {
						console.log(e);
					}
				},
			},
		});

		this.children.removeUser = new Button({
			title: 'Удалить пользователя',
			type: 'submit',
			events: {
				click: async (e: any) => {
					e.preventDefault();
					const data = this.children.inputUser.getValue();
					try {
						await ChatsController.removeUsersToChat(data, this.props.activeChat.id);
					} catch (e) {
						console.log(e);
					}
				},
			},
		});

		this.children.messageListItem = new MessagesSection({ messages: this.props.activeChatMessages ?? [] });

		this.children.newMessage = new Input({
			type: 'text',
			name: 'message',
			placeholder: 'Сообщение...',
			events: {
				input: (e: any) => {
					e.preventDefault();
					this.children.newMessage.setValue(e.target.value);
				},
				focusout: () => {
					(this.children.newMessage as Input).isValid();
				},
			},
		});

		this.children.sendMessage = new Button({
			title: 'Отправить',
			events: {
				click: (e: any) => {
					e.preventDefault();
					const message = this.children.newMessage.getValue();
					const socket = getActiveSocket();
					if (!message || !socket) return;
					try {
						socket.sendMessage(message);
					} catch (e) {
						console.log(e);
					}
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: StoreState) {
	return { chats: state.chats, activeChat: state.activeChat, activeChatMessages: state.activeChatMessages };
}

export const ChatsPage = withStore(mapStateToProps)(BaseChatsPage);
