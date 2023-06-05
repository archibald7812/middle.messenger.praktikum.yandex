import Block from '../Block';
import Store from './store';

export default function connect(block: typeof Block, mapStateToProps: any) {
	return class extends block {
		constructor(props = {}) {
			const store = new Store();

			super({ ...props, ...mapStateToProps(store.getState()) });

			store.on(Store.EVENT_UPDATE, () => {
				this.setProps({ ...mapStateToProps(store.getState()) });
			});
		}
	};
}
