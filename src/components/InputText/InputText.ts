import { tmpl } from './tmpl';
import Block from '../../utils/Block';

export class InputText extends Block {
	public setValue(value: string) {
		return (this.element.children[0] as HTMLInputElement).value = value;
	}

	public getName() {
		return (this.element.children[0] as HTMLInputElement).name;
	}

	public getValue() {
		return (this.element.children[0] as HTMLInputElement).value;
	}

	public isValid() {
		const elem = this.element as HTMLDivElement;
		console.log(elem);
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
