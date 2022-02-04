import {ApiService} from './api.service';
import {ICommentsResponse, IPostResponse} from '../../frontend/src/entities/api/api.interfaces';

export class PostsApiService extends ApiService {
    static getPostsByPage(page: string): Promise<IPostResponse> {
        return PostsApiService.get(`https://gorest.co.in/public/v1/posts?page=${page}`).then(res => res.json());
    }

    static getCommentsOnPost(postId: string): Promise<ICommentsResponse> {
        return PostsApiService.get(`https://gorest.co.in/public/v1/comments?post_id=${postId}`).then(res => res.json());
    }
}