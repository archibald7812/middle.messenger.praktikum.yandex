import { validationFunc } from '../../utils/validation/validation';
import { tmpl } from './tmpl';
import Block from '../../utils/Block';

interface IButton {
	title: string
	type: string
	events?: Record<string, (event: MouseEvent) => void>
}

export class Button extends Block {
	constructor(props: IButton) {
		super(props);
	}

	public getFormData(event: MouseEvent) {
		event.preventDefault();
		if (!event.target) return;
		const form = (event.target as HTMLButtonElement).closest('form') as HTMLFormElement;
		console.log(form);
		let isInvalid = false;
		for (let i = 0; i < form.children.length - 1; i += 1) {
			if (validationFunc(form.children[i] as HTMLDivElement)) isInvalid = true;
		}
		if (isInvalid) return;
		const data = new FormData(form);
		console.log(Object.fromEntries(data.entries()));
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
