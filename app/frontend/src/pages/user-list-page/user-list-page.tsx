import React, {FC, useEffect, useState} from 'react';
import styles from './user-list-page.module.scss';
import PageHeader from '../../components/page-header/page-header';
import {ThunkDispatch} from 'redux-thunk';
import {Dispatch} from 'redux';
import {IUserAction} from '../../redux/reducers/users-reducer/users-reducer.interfaces';
import {
    IUserListPageDispatchProps,
    IUserListPageStateProps,
    UserListPageProps
} from '../../entities/user-list-page/user-list-page.interfaces';
import {IRootReducer} from '../../entities/app/app.interfaces';
import {getUsersByPage} from '../../redux/actions/users-actions/users-actions';
import {connect} from 'react-redux';
import {Pagination, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import Loading from '../../components/loading/loading';
import Card from '../../components/card/card';
import UserCard from '../../components/user-card/user-card';
import {IUser} from '../../entities/api/api.interfaces';

const UserListPage: FC<UserListPageProps> = props => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [enteredPage, setEnteredPage] = useState<string>('');
    const [isUserCardOpen, setIsUserCardOpen] = useState<boolean>(false);
    const [openedUser, setOpenedUser] = useState<IUser>();

    useEffect(() => {
        window.scrollTo(0, 0);
        props.onGetUsersByPage(1);
    }, []);

    const handleUserClick = (user: IUser) => {
        setOpenedUser(user);
        setIsUserCardOpen(true);
    };

    const renderUsers = () => {
        if (props.usersByPage[currentPage] === undefined) {
            return;
        }

        return props.usersByPage[currentPage].map((user, index) => {
            return (
                <TableRow hover key={`user_${user.name}_${index}`} onClick={() => handleUserClick(user)}>
                    <TableCell variant='body' align="left" sx={{ fontSize: '1vmax', cursor: 'pointer', padding: '10px 10px 10px 15px' }}>{user.name}</TableCell>
                    <TableCell variant='body' align="left" sx={{ fontSize: '1vmax', cursor: 'pointer', padding: '10px 10px 10px 15px' }}>{user.email}</TableCell>
                </TableRow>
            );
        });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        if (props.usersByPage[page] === undefined) {
            props.onGetUsersByPage(page);
        }
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleEnteredPage = (event: React.SyntheticEvent) => {
        setEnteredPage((event.target as HTMLInputElement).value);
    };

    const handleGoToPage = () => {
        if (enteredPage !== '' && +enteredPage >= 1 && +enteredPage <= props.totalPages) {
            if (props.usersByPage[+enteredPage] === undefined) {
                props.onGetUsersByPage(+enteredPage);
            }

            setCurrentPage(+enteredPage);
            setEnteredPage('');
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <PageHeader />

            <h1 className={styles.header}>USERS</h1>

            {
                props.usersByPage[currentPage] !== undefined
                    ?
                    <>
                        <Table sx={{ maxWidth: '50%' }} size='small'>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'darkgrey', color: 'white', borderRadius: '10px' }}>
                                    <TableCell variant='head' align="left" sx={{ fontWeight: 'bold', fontSize: '1.2vmax', padding: '15px' }}>NAME</TableCell>
                                    <TableCell variant='head' align="left" sx={{ fontWeight: 'bold', fontSize: '1.2vmax', padding: '15px' }}>E-MAIL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderUsers()}
                            </TableBody>
                        </Table>

                        <div className={styles.paginationWrapper}>
                            <Pagination page={currentPage} boundaryCount={2} count={props.totalPages} onChange={handlePageChange} />

                            <div className={styles.goToPageWrapper}>
                                <p className={styles.goToPageText}>Go to page</p>

                                <input type='number' value={enteredPage} onChange={handleEnteredPage} className={styles.goToPageInput} />

                                <button className={styles.goToPageButton} onClick={handleGoToPage}>Go</button>
                            </div>
                        </div>
                    </>
                    :
                    <Loading />
            }

            <Card isCardVisible={isUserCardOpen} setIsCardVisible={setIsUserCardOpen} cardStyles={{width: '45%', height: '45%'}}>
                <UserCard id={openedUser?.id as number}
                          name={openedUser?.name as string}
                          email={openedUser?.email as string}
                          gender={openedUser?.gender as string}
                          status={openedUser?.status as string} />
            </Card>
        </div>
    );
};

function mapStateToProps(state: IRootReducer): IUserListPageStateProps {
    return {
        totalPages: state.usersReducer.totalPages,
        usersByPage: state.usersReducer.usersByPage
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, IUserAction> & Dispatch<IUserAction>): IUserListPageDispatchProps {
    return {
        onGetUsersByPage: async (page: number) => await dispatch(getUsersByPage(page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
