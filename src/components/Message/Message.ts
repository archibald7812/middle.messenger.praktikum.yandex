import styles from './index.module.css';
import Block from '../../utils/Block';

export interface IMessage {
	id: number
	content?: string | undefined
	time: string
	isMessageByUser?: boolean
	events?: Record<string, (event: MouseEvent) => void>
	user_id?: number | undefined
}

export class Message extends Block {
	render() {
		return this.compile(`
		<div class='${styles.root}
		${this.props.isMessageByUser ? styles.isMessageByProfile : ''}'>
			<div class='${styles.body}'>
				{{content}}
				<div class='${styles.time}'>
					<p>${new Date(this.props.time).toLocaleString()}</p>
				</div>
			</div>
		</div>
	`, this.props);
	}
}
