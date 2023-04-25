import Block from '../../utils/Block';
import { tmpl } from './tmpl';

export class NavBar extends Block {
	constructor() {
		super({});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
