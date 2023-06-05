import { validationFunc } from '../../utils/validation/validation';
import { tmpl } from './tmpl';
import Block from '../../utils/Block';

interface IInput {
	name: string
	type?: string
	placeholder?: string
	label?: string
	disabled?: string
	events?: Record<string, (e: HTMLElementEventMap['input'] | HTMLElementEventMap['blur']) => void>
}

export class Input extends Block {
	constructor(props: IInput) {
		super(props);
	}

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
		const elem = this.element as HTMLDivElement;
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
