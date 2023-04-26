import { tmpl } from './tmpl';
import Block from '../../utils/Block';

interface IAvatar {
	tag?: string
	name?: string
	events?: Record<string, (event: MouseEvent) => void>
}

export class Avatar extends Block {
	constructor(props: IAvatar) {
		super(props);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
