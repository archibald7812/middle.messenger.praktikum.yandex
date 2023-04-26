import { tmpl } from './tmpl';
import Block from '../../utils/Block';

interface ILink {
	title: string
	to: string
	events?: Record<string, (event: MouseEvent) => void>
}

export class Link extends Block {
	constructor(props: ILink) {
		super(props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
