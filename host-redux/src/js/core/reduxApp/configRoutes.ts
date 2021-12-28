import { allModules, BaseModule, IRouter } from '../../modules/allModules';

const createRouteNamespace = (module: BaseModule): IRouter[] => {
	return module.getRoutes().map((route) => ({
		...route,
		path: `${ module.name }${ route.path }`
	}));
};

export const configRoutes = () => {
	return allModules
		.reduce(
			(list, module) => list.concat(module.getRoutes() || []),
			[]
		);
};