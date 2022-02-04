export interface IAppReducerState {
    accessToken: string;
}

export interface IAppAction {
    type: string;
    payload?: any;
}