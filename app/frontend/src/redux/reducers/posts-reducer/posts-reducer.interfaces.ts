import {IComment, IPost} from '../../../entities/api/api.interfaces';

export interface IPostReducerState {
    totalPages: number;
    postsByPage: {
        [page: number]: IPost[]
    };
    commentsOnPost: {
        [postId: number]: IComment[]
    };
}

export interface IPostAction {
    type: string;
    payload?: any;
}