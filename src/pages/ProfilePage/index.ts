import connect from '../../utils/Store/connect';
import { ProfilePage } from './ProfilePage';

export default connect(
	ProfilePage,
	(state: any) => state.authorizedUserData ?? {},
);
