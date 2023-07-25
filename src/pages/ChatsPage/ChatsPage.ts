import { MessagesSection } from '../../components/MessagesSection/MessagesSection';
import { Avatar } from '../../components/Avatar/Avatar';
import { ChatsListItem } from '../../components/ChatsListItem/ChatsListItem';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { chats, messages } from './data';
import { Input } from '../../components/Input/Input';
import { Button } from 'src/components/Button/Button';
import { InputText } from 'src/components/InputText/InputText';
import { createChat, getChats } from '../../api/ChatsApi';
import { addChats } from 'src/utils/Store/actions';
import { IStoreState, withStore } from '../../utils/Store/store';

export class BaseChatsPage extends Block {
	/* 	constructor() {
			super({});
		} */

	init() {
		this.children.navigation = new NavBar();

		console.log(0, this.props)

		const chats = [...{ ...this.props }]

		console.log(1, chats)

		chats.forEach((chat: any) => {
			this.children[`chatsListItem${chat.id}`] = new ChatsListItem({
				id: chat.id,
				name: chat.title,
				lastMessagePlaceholder: chat.last_message,
				newMessages: chat.unread_count,
			});
		})

		this.children.avatar = new Avatar({});

		this.children.createChat = new Button({
			title: 'Создать чат',
			type: 'submit',
			events: {
				click: async (e) => {
					e.preventDefault()
					const data = this.children.inputChat.getValue()
					const createChatResponse = await createChat(data)
					if (createChatResponse.status === 200) {
						const chatsDataResponse = await getChats()
						const chatsData = await chatsDataResponse.response
						const chats = JSON.parse(chatsData)
						if (chats) {
							addChats(chats)
						}
					}
				},
			}
		});

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

		messages.forEach((item) => {
			this.children[`messageListItem${item.id}`] = new MessagesSection({
				messages: item.messages,
				day: item.day,
				id: item.id,
			});
		});

		this.children.newMessage = new Input({
			type: 'text',
			name: 'message',
			placeholder: 'Сообщение...',
			events: {
				input: () => {
					(this.children.newMessage as Input).isValid();
				},
				focusout: () => {
					(this.children.newMessage as Input).isValid();
				},
			},
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { ...state.chats };
}

export const ChatsPage = withStore(mapStateToProps)(BaseChatsPage);
