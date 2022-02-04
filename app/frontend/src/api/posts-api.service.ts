import {ApiService} from './api.service';
import {ICommentsResponse, IPostResponse} from '../entities/api/api.interfaces';

export class PostsApiService extends ApiService {
    static getPostsByPage(page: number): Promise<IPostResponse> {
        return PostsApiService.get(`/v1/api/posts?page=${page}`).then(res => res.json());
    }

    static getCommentsOnPost(postId: number): Promise<ICommentsResponse> {
        return PostsApiService.get(`/v1/api/comments?post_id=${postId}`).then(res => res.json());
    }
}