import {IAppAction} from '../../reducers/app-reducer/app-reducer.interfaces';
import {SET_ACCESS_TOKEN} from './app-action-types';

export function setAccessToken(accessToken: string): IAppAction {
    return {
        type: SET_ACCESS_TOKEN,
        payload: accessToken
    }
}