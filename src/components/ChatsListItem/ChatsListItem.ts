
import styles from './index.module.css';
import Block from '../../utils/Block';
import { UnreadMessages } from '../UnreadMessages/UnreadMessages';
import { clearSocket, deleteChatFromStore, setActiveChat, setActiveSocket } from '../../utils/Store/actions';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { StoreState, withStore } from '../../utils/Store/store';
import { Socket } from '../../utils/Socket';
import ChatsController from '../../controllers/ChatsController';

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
				try {
					const token = await ChatsController.getToken(this.props.chatData.id)
					const activeChat = { ...this.props.chatData, token: token.token }
					setActiveChat(activeChat)
				} catch (e) {
					console.log(e)
				}
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
					try {
						await ChatsController.deleteChat(this.props.chatData.id)
					} catch (e) {
						console.log(e)
					}
					deleteChatFromStore(this.props.chatData.id)
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

function mapStateToProps(state: StoreState) {
	return { activeChat: state.activeChat };
}

export const ChatsListItem = withStore(mapStateToProps)(BaseChatsListItem);
