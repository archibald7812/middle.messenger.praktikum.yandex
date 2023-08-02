/* eslint-disable no-constructor-return */
import Block from '../Block';
import { EventBus } from '../EventBus';
import { Socket } from '../Socket';
import { set } from '../helpers/set';

export type User = {
	avatar: string | null
	display_name: string | null
	email: string
	first_name: string
	id: number
	login: string
	phone: string
	second_name: string
}

export type Chat = {
	id: number
	title: string
	avatar: string | null
	unread_count: number
	last_message: {
		user: User
		time: string
		content: string
	} | null
	token?: number
}

export type Message = {
	id: number
	chat_id: Chat['id']
	time: string
	type: string
	user_id: User['id']
	content: string
}

export type StoreState = {
	activeChat?: Chat | null
	activeChatMessages?: Message[]
	activeChatParticipants?: User[]
	authorizedUserData?: User | null
	activeSocket?: Socket | null,
	chats?: Chat[]
}

export const initialState: StoreState = {
	activeChat: null,
	activeChatMessages: [],
	activeChatParticipants: [],
	authorizedUserData: null,
	activeSocket: null,
	chats: []
};

export default class Store extends EventBus {
	private state: StoreState = initialState;

	static EVENT_UPDATE = 'EVENT_STORE_UPDATE';

	static _instance: Store;

	static STORE_NAME = 'myAppStore';

	constructor() {
		if (Store._instance) { return Store._instance; }

		super();

		this.state = initialState;

		Store._instance = this;
	}

	getState() {
		return this.state;
	}

	removeState() {
		this.state = initialState;

		this.emit(Store.EVENT_UPDATE);
	}

	set<TKey extends keyof StoreState>(path: string, value: StoreState[TKey]) {
		set(this.state, path, value);
		console.log('updatedStore', this.state.activeChatMessages)
		this.emit(Store.EVENT_UPDATE);
		return this;
	}
}

const store = new Store();

export function withStore(mapStateToProps: (state: StoreState) => any) {
	return (Component: typeof Block) => {
		return class extends Component {
			constructor(props: any) {
				super({ ...props, ...mapStateToProps(store.getState()) });

				store.on(Store.EVENT_UPDATE, () => {
					const propsFromState = mapStateToProps(store.getState());
					this.setProps(propsFromState);
				});
			}
		}
	}
}
