import { tmpl } from './tmpl';
import Block from '../../utils/Block';

interface IUnreadMessages {
	unreadMessages: number
	events?: Record<string, (event: MouseEvent) => void>
}

export class UnreadMessages extends Block {
	constructor(props: IUnreadMessages) {
		super(props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
