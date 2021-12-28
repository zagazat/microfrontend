import { allModules } from '../../modules/allModules';
import { CaseReducer } from '@reduxjs/toolkit';

export const configReducers = () => {
	const reducers: {[key: string]: CaseReducer } = {};

	allModules.map((module) => Object.assign(reducers, module.getReducers()));

	return reducers;
};