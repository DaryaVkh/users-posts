import React, {FC, useCallback, useState} from 'react';
import styles from './main-page.module.scss';
import PageHeader from '../../components/page-header/page-header';
import {Alert, Button, FormControl, OutlinedInput, Snackbar} from '@mui/material';
import {Dispatch} from 'redux';
import {setAccessToken} from '../../redux/actions/app-actions/app-actions';
import {
    IMainPageDispatchProps,
    IMainPageStateProps,
    MainPageProps
} from '../../entities/main-page/main-page.interfaces';
import {connect} from 'react-redux';
import {IRootReducer} from '../../entities/app/app.interfaces';

const MainPage: FC<MainPageProps> = (props) => {
    const [accessToken, setAccessToken] = useState<string>(props.accessToken);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [isInvalidToken, setIsInvalidToken] = useState<boolean>(false);

    const handleSetTokenClick = useCallback(() => {
        if (accessToken === '') {
            setIsInvalidToken(true);
        } else {
            setIsInvalidToken(false);
            props.onSetAccessToken(accessToken);
            setIsSnackbarOpen(true);
        }
    }, [accessToken]);

    const handleTokenChange = useCallback((event: React.SyntheticEvent) => {
        setAccessToken((event.target as HTMLInputElement).value);
    }, []);

    const handleSnackbarClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSnackbarOpen(false);
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <PageHeader />

            <div className={styles.inputWrapper}>
                <p className={styles.enterAccessToken}>Enter your access token</p>

                <FormControl error={isInvalidToken}>
                    <OutlinedInput placeholder='Access token' sx={{fontSize: '1.2vmax'}} value={accessToken} onChange={handleTokenChange} />

                    {
                        isInvalidToken
                            ? <small className={styles.errorMessage}>Access token can't be empty</small>
                            : null
                    }
                </FormControl>

                <Button variant="contained" onClick={handleSetTokenClick} sx={{ width: '10vw' }}>Save Settings</Button>
            </div>

            <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Saved successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

function mapStateToProps(state: IRootReducer): IMainPageStateProps {
    return {
        accessToken: state.appReducer.accessToken
    };
}

function mapDispatchToProps(dispatch: Dispatch): IMainPageDispatchProps {
    return {
        onSetAccessToken: (accessToken: string) => dispatch(setAccessToken(accessToken))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);