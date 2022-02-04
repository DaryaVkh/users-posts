import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IUserAction} from '../../reducers/users-reducer/users-reducer.interfaces';
import {UsersApiService} from '../../../api/users-api.service';
import {IUser} from '../../../entities/api/api.interfaces';
import {IAppAction} from '../../reducers/app-reducer/app-reducer.interfaces';
import {SET_USERS_BY_PAGE} from './users-action-types';

function setUsersByPage(totalPages: number, page: number, users: IUser[]): IAppAction {
    return {
        type: SET_USERS_BY_PAGE,
        payload: { totalPages, page, users }
    };
}

export function getUsersByPage(page: number): ThunkAction<Promise<void>, {}, {}, IUserAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IUserAction>): Promise<void> => {
        return UsersApiService.getUsersByPage(`${page}`)
            .then((res) => {
                dispatch(setUsersByPage(res.meta.pagination.pages, page, res.data))
            });
    };
}