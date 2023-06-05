import { Error404 } from '../../pages/404/404';
import { Error500 } from '../../pages/500/500';
import { ChangeProfileDataPage } from '../../pages/ChangeProfileDataPage/ChangeProfileDataPage';
import { ChangeProfilePasswordPage } from '../../pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';
import { ChatsPage } from '../../pages/ChatsPage/ChatsPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';

export type IRouteBlock =
	| typeof RegistrationPage
	| typeof ProfilePage
	| typeof LoginPage
	| typeof ChatsPage
	| typeof ChangeProfileDataPage
	| typeof ChangeProfilePasswordPage
	| typeof Error404
	| typeof Error500

export class Route {
	private pathname: string;

	private RouteBlock: IRouteBlock;

	constructor({ pathname, RouteBlock }: { pathname: string; RouteBlock: IRouteBlock }) {
		this.pathname = pathname;
		this.RouteBlock = RouteBlock;
	}

	public match({ pathname }: { pathname: string }) {
		return pathname === this.pathname;
	}

	public navigate({ pathname }: { pathname: string }) {
		if (!this.match({ pathname })) return;

		this.pathname = pathname;
		this.render();
	}

	public render() {
		const root = document.querySelector('#root');
		if (root === null) {
			throw new Error('#root is not found.');
		}
		root.innerHTML = '';
		root.append(new this.RouteBlock().element);
	}
}
