import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { Error404 } from '../../pages/404/404';
import { Error500 } from '../../pages/500/500';
import { ChangeProfileDataPage } from '../../pages/ChangeProfileDataPage/ChangeProfileDataPage';
import { ChangeProfilePasswordPage } from '../../pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';
import { ChatsPage } from '../../pages/ChatsPage/ChatsPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import Block from '../Block';

export type RouteBlock =
	| typeof RegistrationPage
	| typeof ProfilePage
	| typeof LoginPage
	| typeof ChatsPage
	| typeof ChangeProfileDataPage
	| typeof ChangeProfilePasswordPage
	| typeof Error404
	| typeof Error500

interface CustomWindow extends Window {
	profile: typeof ProfilePage;
}
declare let window: CustomWindow;

export class Route {
	public pathname: string;

	private RouteBlock: RouteBlock;

	public block: Block;

	constructor({ pathname, RouteBlock }: { pathname: string; RouteBlock: RouteBlock }) {
		this.pathname = pathname;
		this.RouteBlock = RouteBlock;
		this.block = new this.RouteBlock({});
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

		if (!root) return;

		root.innerHTML = '';

		if (root === null) {
			throw new Error('#root is not found.');
		}

		if (!this.block) {
			this.block = new this.RouteBlock({});
		} else {
			this.block.show();
		}

		root.append(this.block.element);
	}
}
