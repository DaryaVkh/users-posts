import {IPostAction, IPostReducerState} from './posts-reducer.interfaces';
import {SET_COMMENTS_ON_POST, SET_POSTS_BY_PAGE} from '../../actions/posts-actions/post-action-types';

const initialState: IPostReducerState = {
    totalPages: 0,
    postsByPage: {},
    commentsOnPost: {}
}

export const postsReducer = (state: IPostReducerState = initialState, action: IPostAction): IPostReducerState => {
    switch (action.type) {
        case SET_POSTS_BY_PAGE:
            return {
                ...state,
                totalPages: action.payload.totalPages,
                postsByPage: {
                    ...state.postsByPage,
                    ...Object.fromEntries([[action.payload.page, action.payload.posts]])
                }
            };
        case SET_COMMENTS_ON_POST:
            return {
                ...state,
                commentsOnPost: {
                    ...state.commentsOnPost,
                    ...Object.fromEntries([[action.payload.postId, action.payload.comments]])
                }
            };
        default:
            return state;
    }
};