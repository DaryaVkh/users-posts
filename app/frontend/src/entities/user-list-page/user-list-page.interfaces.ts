import {IUserReducerState} from '../../redux/reducers/users-reducer/users-reducer.interfaces';

export interface IUserListPageStateProps extends IUserReducerState {
}

export interface IUserListPageDispatchProps {
    onGetUsersByPage: (page: number) => Promise<void>;
}

export type UserListPageProps = IUserListPageStateProps & IUserListPageDispatchProps;