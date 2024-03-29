/* eslint-disable consistent-return */
import { validationFunc } from '../../utils/validation/validation';
import { tmpl } from './tmpl';
import Block from '../../utils/Block';

export class Button extends Block {
	public getFormData(event: MouseEvent) {
		event.preventDefault();
		if (!event.target) return;
		const form = (event.target as HTMLButtonElement).closest('form') as HTMLFormElement;
		let isInvalid = false;
		for (let i = 0; i < form.children.length - 1; i += 1) {
			if (validationFunc(form.children[i] as HTMLDivElement)) isInvalid = true;
		}
		if (isInvalid) return;
		const data = new FormData(form);
		const payload = Object.fromEntries(data.entries());
		return payload;
	}

	render() {
		return this.compile(tmpl, this.props);
	}
}
