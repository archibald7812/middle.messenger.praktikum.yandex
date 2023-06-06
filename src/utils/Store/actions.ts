import Store from './store';

const store = new Store();

export const addUserData = (userData: any) => {
	userData = JSON.parse(userData);
	const state = store.getState();
	const data = state.authorizedUserData ?? {};
	store.set('authorizedUserData', Object.assign(
		userData,
		data,
	));
};
