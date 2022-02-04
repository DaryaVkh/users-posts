export interface IMainPageStateProps {
    accessToken: string;
}

export interface IMainPageDispatchProps {
    onSetAccessToken: (accessToken: string) => void;
}

export type MainPageProps = IMainPageStateProps & IMainPageDispatchProps;