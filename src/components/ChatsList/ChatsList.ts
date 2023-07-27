import { withStore, IStoreState, IChat } from 'src/utils/Store/store';
import Block from '../../utils/Block';
import styles from './index.module.css';
import { ChatsListItem } from '../ChatsListItem/ChatsListItem';

export interface IChatsListItem {
	id: number
	avatar?: string
	name: string
	latsMessageTime?: string
	lastMessagePlaceholder: string | null
	newMessages: number
	events?: Record<string, (event: MouseEvent) => void>
}

export class BaseChatsList extends Block {

	setProps(nextProps: any): void {

		const newChats = nextProps.chats.filter((item: any) => {
			if (this.props.chats.find((chat: any) => chat.id === item.id)) return false
			else return true
		})

		super.setProps(nextProps)

		newChats.forEach((chat: any) => {
			this.children[`chatsListItem${chat.id}`] = new ChatsListItem({
				chatData: {
					id: chat.id,
					title: chat.title,
					last_message: chat.last_message,
					unread_count: chat.unread_count,
					isActive: chat.id === this.props.activeChat?.id ? true : false
				}
			})
		})
	}

	init() {
		this.props.chats.forEach((chat: any) => {
			this.children[`chatsListItem${chat.id}`] = new ChatsListItem({
				chatData: {
					id: chat.id,
					title: chat.title,
					last_message: chat.last_message,
					unread_count: chat.unread_count,
					isActive: chat.id === this.props.activeChat.id ? true : false
				}
			})
		})
	}

	render() {
		return this.compile(`
			<div class='${styles.root}'>
				${this.props.chats.map((chat: any) => `{{{chatsListItem${chat.id}}}}`).join('')}
			</div>`
			, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { chats: state.chats, activeChat: state.activeChat };
}

export const ChatsList = withStore(mapStateToProps)(BaseChatsList);

