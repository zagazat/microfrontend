import createSagaMiddleware from 'redux-saga';
import { configStore } from './configStore';
import { configReducers } from './configReducers';
import { configSaga } from './configSaga';
import { History, createHashHistory } from 'history';
import { configMiddleware } from './configMiddleware';
import { CaseReducer } from '@reduxjs/toolkit';
import { configRoutes } from './configRoutes';

type ConfigRedux = {
	initState: {[k in string]: any}
}

type ConfigStore = {
	initState: {[k in string]: any},
	history: History,
	middlewares: any[],
	reducers: {[k in string]: CaseReducer}
}

export default ({ initState }: ConfigRedux) => {
	const sagaMiddleware = createSagaMiddleware();
	const reducers = configReducers();
	const routes = configRoutes();
	const middlewares = configMiddleware(sagaMiddleware);
	const history = createHashHistory();

	const storeConfiguration: ConfigStore = { initState, reducers, middlewares, history };

	const store = configStore(storeConfiguration);

	function runSagas() {
		sagaMiddleware.run(configSaga());
	}

	runSagas();

	return { store, routes, history };
};