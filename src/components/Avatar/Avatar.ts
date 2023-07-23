import { tmpl } from './tmpl';
import Block from '../../utils/Block';

interface IAvatar {
	tag?: string
	name?: string
	events?: Record<string, (event: MouseEvent) => void>
	type?: string
}

export class Avatar extends Block {

	render() {
		return this.compile(tmpl, this.props);
	}
}
