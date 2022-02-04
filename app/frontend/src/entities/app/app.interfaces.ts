import {IAppReducerState} from '../../redux/reducers/app-reducer/app-reducer.interfaces';
import {IUserReducerState} from '../../redux/reducers/users-reducer/users-reducer.interfaces';
import {IPostReducerState} from '../../redux/reducers/posts-reducer/posts-reducer.interfaces';

export interface IRootReducer {
    appReducer: IAppReducerState;
    usersReducer: IUserReducerState;
    postsReducer: IPostReducerState;
}