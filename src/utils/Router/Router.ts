/* eslint-disable no-constructor-return */
import { Error404 } from '../../pages/404/404';
import { Route, IRouteBlock } from './Route';

class Router {
	private static instance: Router | null;

	private history: History;

	private routes: Route[];

	private error404: Route;

	constructor() {
		this.history = window.history;
		this.routes = [];
		this.error404 = new Route({ pathname: 'any', RouteBlock: Error404 });
		if (Router.instance) {
			return Router.instance;
		}
	}

	public use({ pathname, RouteBlock }: { pathname: string; RouteBlock: IRouteBlock }) {
		this.routes.push(new Route({ pathname, RouteBlock }));
		return this;
	}

	private onRoute({ pathname }: { pathname: string }) {
		const route = this.routes.find((route) => route.match({ pathname }));

		if (route === undefined) {
			this.error404.render();
			return;
		}

		/* if (isCurrentPathnameProtected() && store.getState().authorizedUserData === null) {
			this.go({ pathname: '/' });
			return;
		} */

		route?.render();
	}

	public start() {
		window.onpopstate = (event) => {
			if (event.currentTarget === null) return;
			if (!('location' in event.currentTarget)) return;
			if (!(event.currentTarget.location instanceof Location)) return;

			this.onRoute({ pathname: event.currentTarget.location.pathname });
		};

		window.addEventListener('click', (event) => {
			if (!(event.target instanceof HTMLElement)) return;

			const clickedLink = event.target.closest('a');
			if (!(clickedLink instanceof HTMLAnchorElement)) return;

			event.preventDefault();
			const href = clickedLink.getAttribute('href');
			if (href === null) return;

			this.go({ pathname: href });
		});

		this.onRoute({ pathname: window.location.pathname });
	}

	public go({ pathname }: { pathname: string }) {
		this.history.pushState({}, '', pathname);
		this.onRoute({ pathname });
	}

	public back() {
		this.history.back();
	}

	public forward() {
		this.history.forward();
	}
}

export const router = new Router();