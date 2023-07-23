import Store from './store';

const store = new Store();

export const addUserData = (userData: any) => {
	userData = JSON.parse(userData);
	store.set('authorizedUserData', userData);
};
