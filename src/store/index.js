import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line
import reducer from './reducer';

const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(reducer),
    compose(composeWithDevTools(applyMiddleware(
        thunk,
        routerMiddleware(history),
    ))),
)

export { history };
export default store;
