/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Avatar } from '../../components/Avatar/Avatar';
import connect from '../../utils/Store/connect';
import { ProfilePage } from './ProfilePage';
import { Input } from '../../components/Input/Input';

export const ProfilePageStored = connect(
	ProfilePage,
	(state: any) => {
		const newProps = state.authorizedUserData ?? {};
		for (const key in newProps) {
			if (key === 'id') continue;
			if (key === 'avatar') {
				newProps[key] = new Avatar({
					tag: '',
					name: newProps.login,
				});
			} else {
				newProps[key] = new Input({
					name: key,
					label: key,
					disabled: 'disabled',
					placeholder: newProps[key],
					events: {
					},
				});
			}
		}
		return newProps;
	},
);
