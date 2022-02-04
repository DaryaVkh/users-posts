import {IComment, IPost} from '../../../entities/api/api.interfaces';
import {IPostAction} from '../../reducers/posts-reducer/posts-reducer.interfaces';
import {SET_COMMENTS_ON_POST, SET_POSTS_BY_PAGE} from './post-action-types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {PostsApiService} from '../../../api/posts-api.service';

function setPostsByPage(totalPages: number, page: number, posts: IPost[]): IPostAction {
    return {
        type: SET_POSTS_BY_PAGE,
        payload: {totalPages, page, posts}
    };
}

function setCommentsOnPost(postId: number, comments: IComment[]): IPostAction {
    return {
        type: SET_COMMENTS_ON_POST,
        payload: {postId, comments}
    };
}

export function getPostsByPage(page: number): ThunkAction<Promise<void>, {}, {}, IPostAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IPostAction>): Promise<void> => {
        return PostsApiService.getPostsByPage(page)
            .then((res) => {
                dispatch(setPostsByPage(res.meta.pagination.pages, page, res.data));
            });
    };
}

export function getCommentsOnPost(postId: number): ThunkAction<Promise<void>, {}, {}, IPostAction> {
    return async (dispatch: ThunkDispatch<{}, {}, IPostAction>): Promise<void> => {
        return PostsApiService.getCommentsOnPost(postId)
            .then((res) => {
                dispatch(setCommentsOnPost(postId, res.data));
            });
    };
}