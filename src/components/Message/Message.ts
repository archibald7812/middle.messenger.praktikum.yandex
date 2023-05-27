import { tmpl } from './tmpl';
import Block from '../../utils/Block';

export interface IMessage {
	id: number
	text?: string | undefined
	time: string
	imageSrc?: string | undefined
	isMessageByProfile?: boolean | undefined
	events?: Record<string, (event: MouseEvent) => void>
}

export class Message extends Block {
	constructor(props: IMessage) {
		super(props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
