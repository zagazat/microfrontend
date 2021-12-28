import { userModule } from './user/UserModule';
import { CaseReducer } from '@reduxjs/toolkit';
import { RouteProps } from 'react-router';

export interface IRouter extends RouteProps {
    name: string;
}

export interface BaseModule {
    readonly name: string;
    getSagas: () => any[];
    getReducers: () => { [key: string]: CaseReducer };
    getMiddlewares: () => any[];
    getRoutes: () => IRouter[];
}

export const allModules: BaseModule[] = [userModule];
