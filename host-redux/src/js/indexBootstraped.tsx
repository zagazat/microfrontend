import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import reduxApp from './core/reduxApp';
import { Route, Router, Switch } from 'react-router-dom';
import '../static/index.css';

const initState = {};
const { store, routes, history } = reduxApp({ initState });

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                {routes.map((route, index) => {
                    return <Route {...route} key={route.path} />;
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
