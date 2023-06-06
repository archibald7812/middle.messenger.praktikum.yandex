/* eslint-disable no-constructor-return */
import { EventBus } from '../EventBus';

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
	activeChatId?: IChat['id'] | null
	activeChaIMessages?: IMessage[]
	activeChatParticipants?: IUser[]
	authorizedUserData?: IUser | null
	chats?: IChat[]
	isAddingUserToChatDialogOpen?: boolean
	isChatCreationDialogOpen?: boolean
	isChatDeletionDialogOpen?: boolean
	isChatParticipantsDialogOpen?: boolean
}

const initialState: IStoreState = {
	activeChatId: null,
	activeChaIMessages: [],
	activeChatParticipants: [],
	authorizedUserData: null,
	chats: [],
	isAddingUserToChatDialogOpen: false,
	isChatCreationDialogOpen: false,
	isChatDeletionDialogOpen: false,
	isChatParticipantsDialogOpen: false,
};

export default class Store extends EventBus {
	private state: IStoreState = initialState;

	static EVENT_UPDATE = 'EVENT_STORE_UPDATE';

	static _instance: Store;

	static STORE_NAME = 'myAppStore';

	constructor() {
		if (Store._instance) { return Store._instance; }

		super();

		const savedState = localStorage.getItem(Store.STORE_NAME);

		this.state = savedState ? (JSON.parse(savedState) ?? {}) : initialState;

		Store._instance = this;

		this.on(
			Store.EVENT_UPDATE,
			() => {
				localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state));
			},
		);
	}

	getState() {
		return this.state;
	}

	removeState() {
		this.state = {};
		this.emit(Store.EVENT_UPDATE);
		console.log('removeState', this.state);
	}

	set<TKey extends keyof IStoreState>(id: TKey, value: IStoreState[TKey]) {
		this.state[id] = value;
		this.emit(Store.EVENT_UPDATE);
		console.log('setState', this.state);
		return this;
	}
}
