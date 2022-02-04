import {IUser} from '../../../entities/api/api.interfaces';

export interface IUserReducerState {
    totalPages: number;
    usersByPage: {
        [page: number]: IUser[]
    };
}

export interface IUserAction {
    type: string;
    payload?: any;
}