import { expect } from 'chai';
import sinon from 'sinon';
import { Button } from './Button';

describe('Button component', () => {
	it('Should be clickable', () => {
		const callback = sinon.stub();
		const button = new Button({ title: '123', events: { click: callback }, type: 'submit' });

		const element = button.element as HTMLElement;

		element.click();

		expect(callback.calledOnce).to.eq(true);
	});
});
