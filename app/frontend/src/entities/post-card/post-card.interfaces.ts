import {IComment, IPost} from '../api/api.interfaces';

export interface IPostCardOwnProps extends IPost {
}

export interface IPostCardStateProps {
    commentsOnPost: {
        [postId: number]: IComment[]
    };
}

export interface IPostCardDispatchProps {
    onGetCommentsOnPost: (postId: number) => Promise<void>;
}

export type IPostCardProps = IPostCardOwnProps & IPostCardStateProps & IPostCardDispatchProps;