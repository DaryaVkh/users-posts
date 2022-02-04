import {ApiService} from './api.service';
import {IUserResponse} from '../../frontend/src/entities/api/api.interfaces';

export class UsersApiService extends ApiService {
    static getUsersByPage(page: string): Promise<IUserResponse> {
        return UsersApiService.get(`https://gorest.co.in/public/v1/users?page=${page}`).then(res => res.json());
    }
}