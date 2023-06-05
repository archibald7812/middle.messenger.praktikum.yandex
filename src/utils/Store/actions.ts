import Store from './store';

const store = new Store();

export const addUserData = (userData: any) => {
	console.log(5, userData);
	userData = JSON.parse(userData);
	console.log(6, userData);
	const state = store.getState();
	const data = state.authorizedUserData ?? {};
	store.set('authorizedUserData', Object.assign(
		userData,
		data,
	));
	console.log(store.getState());
};
