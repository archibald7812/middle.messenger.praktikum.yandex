
import styles from './index.module.css';
import Block from '../../utils/Block';
import { UnreadMessages } from '../UnreadMessages/UnreadMessages';
import { clearSocket, getActiveSocket, setActiveChat, setActiveSocket } from '../../utils/Store/actions';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { deleteChat, getToken } from '../../api/ChatsApi';
import { IStoreState, withStore } from '../../utils/Store/store';
import { Socket } from '../../utils/Socket';

export interface IChatsListItem {
	id: number
	avatar?: string
	title: string
	latsMessageTime?: string
	last_message: any
	unread_count: number
	events?: Record<string, (event: MouseEvent) => void>
}

export class BaseChatsListItem extends Block {

	setProps(nextProps: any): void {
		super.setProps(nextProps)
	}

	init() {
		this.props.events = {
			click: async (e: any) => {
				e.preventDefault()
				clearSocket()
				const tokenResponse = await getToken(this.props.chatData.id);
				const token = await JSON.parse(tokenResponse.response);
				const activeChat = { ...this.props.chatData, token: token.token }
				setActiveChat(activeChat)
				const socket = new Socket()
				setActiveSocket(socket)
			}
		}

		this.children.unreadMessages = new UnreadMessages({
			unreadMessages: this.props.chatData?.unread_count,
		});

		this.children.delete = new DeleteButton({
			title: 'Удалить',
			events: {
				click: async (e: any) => {
					e.preventDefault()
					await deleteChat(this.props.chatData.id)
				}
			}
		});
	}

	render() {
		return this.compile(`
		<div class='${styles.root} ${this.props.chatData.isActive ? styles.active : ''}'>
			<div class='${styles.profile}'>
				<div class='${styles.avatar}'></div>
			</div>
			<div class='${styles.main}'>
				<h4>{{chatData.title}}</h4>
				<p>{{chatData.last_message.content}}</p>
			</div>
			<div class='${styles.info}'>
				{{{delete}}}
				<div class='${styles.newMessages}'>{{{unreadMessages}}}</div>
			</div>
		</div>
	`, this.props);
	}
}

function mapStateToProps(state: IStoreState) {
	return { activeChat: state.activeChat };
}

export const ChatsListItem = withStore(mapStateToProps)(BaseChatsListItem);

