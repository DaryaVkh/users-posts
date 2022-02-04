import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import {BrowserRouter} from 'react-router-dom';
import {applyMiddleware, compose, createStore, Store} from 'redux';
import rootReducer from './redux/reducers/root-reducer';
import {IAppReducerState} from './redux/reducers/app-reducer/app-reducer.interfaces';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import {IUserReducerState} from './redux/reducers/users-reducer/users-reducer.interfaces';
import {IPostReducerState} from './redux/reducers/posts-reducer/posts-reducer.interfaces';

export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export interface AppStore {
    appReducer: IAppReducerState,
    usersReducer: IUserReducerState,
    postsReducer: IPostReducerState
}

const store: Store<AppStore> = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);