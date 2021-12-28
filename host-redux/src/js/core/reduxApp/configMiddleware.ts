import { allModules } from '../../modules/allModules';

export const configMiddleware = (...customMiddlewares: any[]) => {
	let middlewares = [...customMiddlewares];

	allModules.forEach((module) => {
		middlewares = [...middlewares, ...module.getMiddlewares()];
	});

	return middlewares;
};