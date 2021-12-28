import routes from './routes';
import { userReducers } from './redux/userSlices';
import { BaseModule } from '../allModules';

class UserModule implements BaseModule {
	readonly name: string = 'user';

	getSagas(): any[] {
		return [];
	}

	getReducers() {
		return {
			user: userReducers
		};
	}

	getMiddlewares(): any[] {
		return [];
	}

	getRoutes() {
		return routes;
	}
}

const userModule = new UserModule();

export { userModule };