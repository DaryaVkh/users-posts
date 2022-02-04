import {IUserAction, IUserReducerState} from './users-reducer.interfaces';
import {SET_USERS_BY_PAGE} from '../../actions/users-actions/users-action-types';

const initialState: IUserReducerState = {
    totalPages: 0,
    usersByPage: {}
};

export const usersReducer = (state: IUserReducerState = initialState, action: IUserAction): IUserReducerState => {
    switch (action.type) {
        case SET_USERS_BY_PAGE:
            return {
                ...state,
                totalPages: action.payload.totalPages,
                usersByPage: {
                    ...state.usersByPage,
                    ...Object.fromEntries([[action.payload.page, action.payload.users]])
                }
            };
        default:
            return state;
    }
};

