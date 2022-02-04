import {combineReducers} from 'redux';
import {appReducer} from './app-reducer/app-reducer';
import {usersReducer} from './users-reducer/users-reducer';
import {postsReducer} from './posts-reducer/posts-reducer';

export default combineReducers({
    appReducer,
    usersReducer,
    postsReducer
});