import {IPost} from '../api/api.interfaces';

export interface IPostListPageStateProps {
    totalPages: number;
    postsByPage: {
        [page: number]: IPost[]
    };
}

export interface IPostListPageDispatchProps {
    onGetPostsByPage: (page: number) => Promise<void>;
}

export type IPostListPageProps = IPostListPageStateProps & IPostListPageDispatchProps;