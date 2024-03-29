import styles from './index.module.css';
import Block from '../../utils/Block';
import { IMessage, Message } from '../Message/Message';
import { StoreState, withStore } from '../../utils/Store/store';

export class BaseMessagesSection extends Block {
	setProps(nextProps: any): void {
		super.setProps(nextProps);
		this.props.messages.forEach((message: IMessage) => {
			this.children[`${message.id}`] = new Message({
				id: message.id,
				content: message.content,
				time: message.time,
				isMessageByUser: message.user_id === this.props.userId,
			});
		});
	}

	init() {
		this.props.messages.forEach((message: IMessage) => {
			this.children[`${message.id}`] = new Message({
				id: message.id,
				content: message.content,
				time: message.time,
				isMessageByUser: message.user_id === this.props.userId,
			});
		});
	}

	render() {
		return this.compile(`
		<div class='${styles.root}'>
			<div class='${styles.main}'>
				${this.props.messages.sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime()).map((message: any) => `{{{${message.id}}}}`).join('')}
			</div>
		</div>`, this.props);
	}
}

function mapStateToProps(state: StoreState) {
	return { userId: state.authorizedUserData?.id, messages: state.activeChatMessages };
}

export const MessagesSection = withStore(mapStateToProps)(BaseMessagesSection);
