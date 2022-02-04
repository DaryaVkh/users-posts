import {IAppAction, IAppReducerState} from './app-reducer.interfaces';
import {SET_ACCESS_TOKEN} from '../../actions/app-actions/app-action-types';

const initialState: IAppReducerState = {
    accessToken: ''
}

export const appReducer = (state: IAppReducerState = initialState, action: IAppAction): IAppReducerState => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            };
        default:
            return state;
    }
};