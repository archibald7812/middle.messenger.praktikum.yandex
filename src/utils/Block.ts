import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';
import { merge } from './helpers/merge';

export default class Block<P extends Record<string, any> = any> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	} as const;

	public id = nanoid(6);

	protected props: P;

	public children: P;

	protected eventBus: () => EventBus;

	private _element: HTMLElement | null = null;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(propsWithChildren: P) {
		const eventBus = new EventBus();

		const { props, children } = this._getChildrenAndProps(propsWithChildren);

		this.children = this._makePropsProxy(children);
		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	_getChildrenAndProps(childrenAndProps: P): { props: P, children: P } {
		const props: Record<string, unknown> = {};
		const children: Record<string, unknown> = {};

		Object.entries(childrenAndProps).forEach(([key, value]) => {
			if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
				children[key as string] = value;
			} else if (value instanceof Block) {
				children[key as string] = value;
			} else {
				props[key] = value;
			}
		});

		return { props: props as P, children: children as P };
	}

	_addEvents() {
		const { events = {} } = this.props as P & { events: Record<string, () => void> };

		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const { events = {} } = this.props as P & { events: Record<string, () => void> };

		Object.keys(events).forEach((eventName) => {
			this._element?.removeEventListener(eventName, events[eventName]);
		});
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _init() {
		this.init();

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init() {
	}

	show() {
		this.getContent().style.display = 'block';
	}

	hide() {
		this.getContent().style.display = 'none';
	}

	_componentDidMount() {
		this.componentDidMount();
		Object.values(this.children).forEach((child) => { child.dispatchComponentDidMount(); });
	}

	componentDidMount() {
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
		if (Object.keys(this.children).length) { this.eventBus().emit(Block.EVENTS.FLOW_RENDER); }
	}

	private _componentDidUpdate(oldProps: P, newProps: P) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(oldProps: P, newProps: P) {
		return true;
	}

	setProps(nextProps: P) {
		if (!nextProps) {
			return;
		}

		const { children, props } = this._getChildrenAndProps(nextProps)

		merge(this.children, children)
		merge(this.props, props)
	}

	get element() {
		return this._element as HTMLElement;
	}

	private _render() {
		const fragment = this.render();

		const newElement = fragment.firstElementChild as HTMLElement;

		if (this._element && newElement) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	protected compile(template: string, context: any) {
		const contextAndStubs = { ...context };

		Object.entries(this.children).forEach(([name, component]) => {
			if (Array.isArray(component)) {
				contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
			} else {
				contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
			}
		});

		const tmpl = Handlebars.compile(template);

		const html = tmpl(contextAndStubs);

		const temp = document.createElement('template');

		temp.innerHTML = html;

		const replaceStub = (component: Block) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

			if (!stub) {
				return;
			}

			component.getContent()?.append(...Array.from(stub.childNodes));

			stub.replaceWith(component.getContent()!);
		};

		Object.entries(this.children).forEach(([_, component]) => {
			if (Array.isArray(component)) {
				component.forEach(replaceStub);
			} else {
				replaceStub(component);
			}
		});

		return temp.content;
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: P) {
		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
		const self = this;

		return new Proxy(props, {
			get(target, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop: string, value) {
				const oldTarget = { ...target };

				target[prop as keyof P] = value;
				// Запускаем обновление компоненты
				// Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}
}
