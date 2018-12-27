import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import Layout from './layouts';
import 'antd/dist/antd.css';
import './common/style/reset.css'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
