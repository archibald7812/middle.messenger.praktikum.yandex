import { tmpl } from './tmpl';
import Block from '../../utils/Block';
import { IMessage, Message } from '../Message/Message';

export interface IMessagesSection {
	id: number
	day: string
	messages: IMessage[]
	events?: Record<string, (event: MouseEvent) => void>
}

export class MessagesSection extends Block {
	constructor(props: IMessagesSection) {
		super(props);
	}

	init() {
		this.props.messages.forEach((message: IMessage) => {
			this.children[`${message.id}`] = new Message({
				id: message.id,
				text: message.text,
				time: message.time,
				imageSrc: message.imageSrc,
				isMessageByProfile: message.isMessageByProfile,
			});
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
