import { tmpl } from './tmpl';
import { NavBar } from '../../components/NavBar/NavBar';
import Block from '../../utils/Block';
import { Link } from '../../components/Link/Link';

export class Error404 extends Block {
	constructor() {
		super({});
	}

	init() {
		this.children.navigation = new NavBar();

		this.children.link = new Link({
			title: 'Не туда попали, вернитесь домой)',
			to: '/log-in',
		});
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
