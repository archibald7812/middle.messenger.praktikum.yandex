/* eslint-disable no-constructor-return */
import Block from '../Block';
import { EventBus } from '../EventBus';
import { Socket } from '../Socket';
import { set } from '../helpers/set';

export type IUser = {
	avatar: string | null
	display_name: string | null
	email: string
	first_name: string
	id: number
	login: string
	phone: string
	second_name: string
}

export type IChat = {
	id: number
	title: string
	avatar: string | null
	unread_count: number
	last_message: {
		user: IUser
		time: string
		content: string
	} | null
	token?: number
}

export type IMessage = {
	id: number
	chat_id: IChat['id']
	time: string
	type: string
	user_id: IUser['id']
	content: string
}

export type IStoreState = {
	activeChat?: IChat | null
	activeChaIMessages?: IMessage[]
	activeChatParticipants?: IUser[]
	authorizedUserData?: IUser | null
	activeSocket?: Socket | null,
	chats?: IChat[]
}

export const initialState: IStoreState = {
	activeChat: null,
	activeChaIMessages: [],
	activeChatParticipants: [],
	authorizedUserData: null,
	activeSocket: null,
	chats: []
};

export default class Store extends EventBus {
	private state: IStoreState = initialState;

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

	set<TKey extends keyof IStoreState>(path: string, value: IStoreState[TKey]) {
		set(this.state, path, value);
		console.log('updatedStore', this.state.activeChaIMessages)
		this.emit(Store.EVENT_UPDATE);
		return this;
	}
}

const store = new Store();

export function withStore(mapStateToProps: (state: IStoreState) => any) {
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
