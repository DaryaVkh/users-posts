export interface IUser {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface IComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export interface IUserResponse {
    meta: {
        pagination: {
            pages: number;
        }
    };
    data: IUser[];
}

export interface IPostResponse {
    meta: {
        pagination: {
            pages: number;
        }
    };
    data: IPost[];
}

export interface ICommentsResponse {
    data: IComment[];
}