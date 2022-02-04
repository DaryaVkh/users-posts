import {ApiService} from './api.service';
import {IUserResponse} from '../entities/api/api.interfaces';

export class UsersApiService extends ApiService {
    static getUsersByPage(page: string): Promise<IUserResponse> {
        return UsersApiService.get(`/v1/api/users?page=${page}`).then(res => res.json());
    }
}