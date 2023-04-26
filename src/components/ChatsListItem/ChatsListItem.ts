import { tmpl } from './tmpl';
import Block from '../../utils/Block';
import { UnreadMessages } from '../UnreadMessages/UnreadMessages';

export interface IChatsListItem {
	id: number
	avatar: string
	name: string
	latsMessageTime: string
	lastMessagePlaceholder: string
	newMessages: number
	events?: Record<string, (event: MouseEvent) => void>
}

export class ChatsListItem extends Block {
	constructor(props: IChatsListItem) {
		super(props);
	}

	init() {
		this.children.unreadMessages = new UnreadMessages({
			unreadMessages: this.props.newMessages,
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
