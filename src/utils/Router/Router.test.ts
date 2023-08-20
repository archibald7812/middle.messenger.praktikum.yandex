import { expect } from 'chai';
import { Router } from './Router'; // Путь к вашему файлу с классом Router
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { ChangeProfilePasswordPage } from '../../pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';

describe('Router', () => {
	let router: Router;

	before(() => {
		router = new Router();
		router.start();
	});

	afterEach(() => {
		router = new Router();
	});

	it('should initialize correctly', () => {
		expect(router).to.be.instanceOf(Router);
	});

	it('should add routes correctly', () => {
		router.use({ pathname: '/registration', RouteBlock: RegistrationPage });
		router.use({ pathname: '/new-password', RouteBlock: ChangeProfilePasswordPage });

		expect(router.routes).to.have.lengthOf(2);
	});

	it('should handle route navigation correctly', () => {
		router.use({ pathname: '/registration', RouteBlock: RegistrationPage });
		router.go('/registration');

		expect(router.currentRoute?.pathname).to.equal('/registration');
	});
});
