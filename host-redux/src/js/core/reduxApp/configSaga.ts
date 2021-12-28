import { all } from 'redux-saga/effects';
import { allModules } from '../../modules/allModules';

export const configSaga = () => {
	const sagas = allModules.reduce((list, module) => list.concat(module.getSagas() || []), []);

	return function* () {
		yield all(sagas);
	};
};