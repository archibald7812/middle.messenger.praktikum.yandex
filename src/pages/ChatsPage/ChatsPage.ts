import { MessagesSection } from '../../components/MessagesSection/MessagesSection';
import { Avatar } from '../../components/Avatar/Avatar';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Input } from '../../components/Input/Input';
import { Button } from 'src/components/Button/Button';
import { InputText } from 'src/components/InputText/InputText';
import { addUsersToChat, createChat, getChats, getToken, removeUsersFromChat } from '../../api/ChatsApi';
import { addChat, getActiveSocket } from 'src/utils/Store/actions';
import { IStoreState, withStore } from '../../utils/Store/store';
import { ChatsList } from 'src/components/ChatsList/ChatsList';

export class BaseChatsPage extends Block {

	setProps(nextProps: any): void {
		super.setProps(nextProps)
	}

	init() {
		this.children.navigation = new NavBar();

		this.children.chatsList = new ChatsList({})

		this.children.avatar = new Avatar({});

		this.children.inputChat = new InputText({
			title: 'Создать чат',
			events: {
				input: (e: any) => {
					e.preventDefault()
					console.log(e.target.value)
					this.children.inputChat.setValue(e.target.value)
				},
			}
		});

		this.children.createChat = new Button({
			title: 'Создать чат',
			type: 'submit',
			events: {
				click: async (e: any) => {
					e.preventDefault()
					const data = this.children.inputChat.getValue()
					const createChatResponse = await createChat(data)
					if (createChatResponse.status === 200) {
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
					}
				},
			}
		});

		this.children.inputUser = new InputText({
			title: 'Имя пользователя',
			events: {
				input: (e: any) => {
					e.preventDefault()
					console.log(e.target.value)
					this.children.inputChat.setValue(e.target.value)
				},
			}
		});

		this.children.addUser = new Button({
			title: 'Добавить пользователя',
			type: 'submit',
			events: {
				click: async (e: any) => {
					e.preventDefault()
					const data = this.children.inputUser.getValue()
					await addUsersToChat(data, this.props.activeChat.id)
				},
			}
		});

		this.children.removeUser = new Button({
			title: 'Удалить пользователя',
			type: 'submit',
			events: {
				click: async (e: any) => {
					e.preventDefault()
					const data = this.children.inputUser.getValue()
					await removeUsersFromChat(data, this.props.activeChat.id)
				},
			}
		});

		this.children[`messageListItem`] = new MessagesSection({ messages: this.props.activeChatMessages ?? [] });

		this.children.newMessage = new Input({
			type: 'text',
			name: 'message',
			placeholder: 'Сообщение...',
			events: {
				input: (e: any) => {
					e.preventDefault()
					this.children.newMessage.setValue(e.target.value)
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
					e.preventDefault()
					const message = this.children.newMessage.getValue()
					const socket = getActiveSocket()
					if (!message || !socket) return
					socket.sendMessage(message)
				}
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { chats: state.chats, activeChat: state.activeChat, activeChatMessages: state.activeChaIMessages };
}

export const ChatsPage = withStore(mapStateToProps)(BaseChatsPage);
