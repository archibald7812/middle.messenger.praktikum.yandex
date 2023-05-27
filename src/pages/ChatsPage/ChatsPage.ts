import { MessagesSection } from '../../components/MessagesSection/MessagesSection';
import { Avatar } from '../../components/Avatar/Avatar';
import { ChatsListItem } from '../../components/ChatsListItem/ChatsListItem';
import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { chats, messages } from './data';
import { Link } from '../../components/Link/Link';
import { Input } from '../../components/Input/Input';

export class ChatsPage extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.navigation = new NavBar();

		chats.forEach((chat) => {
			this.children[`chatsListItem${chat.id}`] = new ChatsListItem({
				avatar: chat.avatar,
				id: chat.id,
				name: chat.name,
				latsMessageTime: chat.latsMessageTime,
				lastMessagePlaceholder: chat.lastMessagePlaceholder,
				newMessages: chat.newMessages,
			});
		});

		this.children.avatar = new Avatar({});

		this.children.profileLink = new Link({
			title: 'Профиль',
			to: '/profile',
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
