import { LoginPage } from './components/login/LoginPage';
import { MainPage } from './components/main';

export default [
    {
        path: '/',
        component: MainPage,
        exact: true,
        name: 'login',
    },
    {
        path: '/sign-in',
        component: LoginPage,
        exact: true,
        name: 'sign',
    },
];
