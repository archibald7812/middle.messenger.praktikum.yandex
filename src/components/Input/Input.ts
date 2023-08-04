import { tmpl } from './tmpl';
import Block from '../../utils/Block';

export class Input extends Block {
	public setValue(value: string) {
		return (this.element.children[1] as HTMLInputElement).value = value;
	}

	public getName() {
		return (this.element.children[1] as HTMLInputElement).name;
	}

	public getValue() {
		return (this.element.children[1] as HTMLInputElement).value;
	}

	public isValid() {
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
