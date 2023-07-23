import { ProfilePageStored } from '../../pages/ProfilePage';
import { Error404 } from '../../pages/404/404';
import { Error500 } from '../../pages/500/500';
import { ChangeProfileDataPage } from '../../pages/ChangeProfileDataPage/ChangeProfileDataPage';
import { ChangeProfilePasswordPage } from '../../pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';
import { ChatsPage } from '../../pages/ChatsPage/ChatsPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import Block from '../Block';

export type IRouteBlock =
	| typeof RegistrationPage
	| typeof ProfilePageStored
	| typeof LoginPage
	| typeof ChatsPage
	| typeof ChangeProfileDataPage
	| typeof ChangeProfilePasswordPage
	| typeof Error404
	| typeof Error500

interface CustomWindow extends Window {
	profile: typeof ProfilePageStored;
}
declare let window: CustomWindow;

export class Route {
	private pathname: string;

	private RouteBlock: IRouteBlock;

	public block: Block

	constructor({ pathname, RouteBlock }: { pathname: string; RouteBlock: IRouteBlock }) {
		this.pathname = pathname;
		this.RouteBlock = RouteBlock;
		this.block = new this.RouteBlock()
	}

	public leave() {
		if (this.block) {
			this.block.hide();
		}
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

		if (!this.block) {
			this.block = new this.RouteBlock();
		} else {
			this.block.show()
		}

		root.append(this.block.element);



	}
}
