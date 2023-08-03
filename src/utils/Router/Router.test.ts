import { expect } from 'chai';
import { Router } from './Router'; // Путь к вашему файлу с классом Router
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { ChangeProfilePasswordPage } from '../../pages/ChangeProfilePasswordPage/ChangeProfilePasswordPage';

describe('Router', () => {
	let router: Router;

	before(() => {
		router = new Router();
	});

	afterEach(() => {
		// Очищаем состояние роутера после каждого теста
		// Может потребоваться дополнительная реализация для класса Router
		// чтобы дать возможность очищать состояние
		// например, добавить метод для очистки роутов, и т.д.
		router = new Router();
	});

	it('should initialize correctly', () => {
		// Проверяем, что при инициализации Router создается без ошибок
		expect(router).to.be.instanceOf(Router);
	});

	it('should add routes correctly', () => {
		// Проверяем, что метод use() добавляет роуты
		router.use({ pathname: '/registration', RouteBlock: RegistrationPage });
		router.use({ pathname: '/new-password', RouteBlock: ChangeProfilePasswordPage });

		// В этом примере у нас уже есть два роута
		expect(router['routes']).to.have.lengthOf(2);
	});

	it('should handle route navigation correctly', () => {
		// Для тестирования методов go(), back(), forward() и обработчика onRoute(),
		// возможно, вам потребуется дополнительная реализация Router.
		// Например, вы можете добавить метод getRoutes(), чтобы получить путь текущего роута
		// и метод clearRoutes(), чтобы очистить роуты перед каждым тестом.

		// В этом тесте вы можете добавить роуты, вызвать методы go(), back(), forward() и проверить,
		// что они корректно изменяют текущий роут в зависимости от истории браузера.

		// Примеры тестов:
		// - Попробуйте добавить роуты и использовать метод go('/path') для перехода на определенный роут.
		// - Попробуйте использовать метод back() и forward() для перехода назад и вперед по истории.
		// - Проверьте, что обработчик onRoute() вызывается при изменении роута.
	});
});