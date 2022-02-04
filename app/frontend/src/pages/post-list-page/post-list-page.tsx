import React, {FC, useEffect, useState} from 'react';
import styles from './post-list-page.module.scss';
import PageHeader from '../../components/page-header/page-header';
import {Pagination, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import Loading from '../../components/loading/loading';
import {IRootReducer} from '../../entities/app/app.interfaces';
import {
    IPostListPageDispatchProps,
    IPostListPageProps,
    IPostListPageStateProps
} from '../../entities/post-list-page/post-list-page.interfaces';
import {ThunkDispatch} from 'redux-thunk';
import {Dispatch} from 'redux';
import {getCommentsOnPost, getPostsByPage} from '../../redux/actions/posts-actions/posts-actions';
import {connect} from 'react-redux';
import {IPost} from '../../entities/api/api.interfaces';
import Card from '../../components/card/card';
import PostCard from '../../components/post-card/post-card';
import {IPostAction} from '../../redux/reducers/posts-reducer/posts-reducer.interfaces';

const PostListPage: FC<IPostListPageProps> = props => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [enteredPage, setEnteredPage] = useState<string>('');
    const [isPostCardOpen, setIsPostCardOpen] = useState<boolean>(false);
    const [openedPost, setOpenedPost] = useState<IPost>();

    useEffect(() => {
        props.onGetPostsByPage(1);
    }, []);

    const handlePostClick = (post: IPost) => {
        setOpenedPost(post);
        setIsPostCardOpen(true);
    };

    const renderPosts = () => {
        if (props.postsByPage[currentPage] === undefined) {
            return;
        }

        return props.postsByPage[currentPage].map((post, index) => {
            return (
                <TableRow hover key={`user_${post.title}_${index}`} onClick={() => handlePostClick(post)}>
                    <TableCell variant='body' align="left" sx={{ fontSize: '1vmax', cursor: 'pointer', padding: '10px 10px 10px 15px' }}>{post.id}</TableCell>
                    <TableCell variant='body' align="left" sx={{ fontSize: '1vmax', cursor: 'pointer', padding: '10px 10px 10px 15px' }}>{post.title}</TableCell>
                </TableRow>
            );
        });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        if (props.postsByPage[page] === undefined) {
            props.onGetPostsByPage(page);
        }
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleEnteredPage = (event: React.SyntheticEvent) => {
        setEnteredPage((event.target as HTMLInputElement).value);
    };

    const handleGoToPage = () => {
        if (enteredPage !== '' && +enteredPage >= 1 && +enteredPage <= props.totalPages) {
            if (props.postsByPage[+enteredPage] === undefined) {
                props.onGetPostsByPage(+enteredPage);
            }
            setCurrentPage(+enteredPage);
            setEnteredPage('');
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <PageHeader />

            <h1 className={styles.header}>POSTS</h1>

            {
                props.postsByPage[currentPage] !== undefined
                    ?
                    <>
                        <Table sx={{ maxWidth: '50%' }} size='small'>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'darkgrey', color: 'white', borderRadius: '10px' }}>
                                    <TableCell variant='head' align="left" sx={{ fontWeight: 'bold', fontSize: '1.2vmax', padding: '15px' }}>ID</TableCell>
                                    <TableCell variant='head' align="left" sx={{ fontWeight: 'bold', fontSize: '1.2vmax', padding: '15px' }}>TITLE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderPosts()}
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

            <Card isCardVisible={isPostCardOpen} setIsCardVisible={setIsPostCardOpen} cardStyles={{width: '50%', height: '60%'}}>
                <PostCard id={openedPost?.id as number} userId={openedPost?.userId as number} title={openedPost?.title as string} body={openedPost?.body as string} />
            </Card>
        </div>
    );
};

function mapStateToProps(state: IRootReducer): IPostListPageStateProps {
    return {
        totalPages: state.postsReducer.totalPages,
        postsByPage: state.postsReducer.postsByPage
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, IPostAction> & Dispatch<IPostAction>): IPostListPageDispatchProps {
    return {
        onGetPostsByPage: async (page: number) => await dispatch(getPostsByPage(page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);