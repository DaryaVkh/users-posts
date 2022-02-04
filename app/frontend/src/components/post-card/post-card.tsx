import React, {FC, useEffect} from 'react';
import styles from './post-card.module.scss';
import {
    IPostCardDispatchProps,
    IPostCardProps,
    IPostCardStateProps
} from '../../entities/post-card/post-card.interfaces';
import {IRootReducer} from '../../entities/app/app.interfaces';
import {ThunkDispatch} from 'redux-thunk';
import {IPostAction} from '../../redux/reducers/posts-reducer/posts-reducer.interfaces';
import {Dispatch} from 'redux';
import {getCommentsOnPost} from '../../redux/actions/posts-actions/posts-actions';
import {connect} from 'react-redux';
import {Scrollbars} from 'rc-scrollbars';
import Loading from '../loading/loading';

const PostCard: FC<IPostCardProps> = props => {
    useEffect(() => {
        if (props.commentsOnPost[props.id] === undefined) {
            props.onGetCommentsOnPost(props.id);
        }
    }, []);

    const renderComments = () => {
        if (!props.commentsOnPost[props.id]) {
            return;
        }

        if (props.commentsOnPost[props.id].length === 0) {
            return <p className={styles.noComments}>No comments here yet...</p>;
        }

        return props.commentsOnPost[props.id].map((comment, index) => {
            return (
                <div className={styles.commentWrapper}>
                    <b>{comment.name}</b>

                    &#128172; {comment.body}
                </div>
            );
        });
    };

    return (
        <div className={styles.postCardWrapper}>

            {
                !props.commentsOnPost[props.id]
                    ? <Loading />
                    :
                    <>
                        <div className={styles.postWrapper}>
                            <p className={styles.postId}>Post #{props.id}</p>
                            <h3 className={styles.postTitle}>{props.title}</h3>

                            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}
                                        renderThumbVertical={() => <div style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}/>}
                                        renderTrackHorizontal={props => <div {...props} style={{display: 'none'}}/>}
                                        classes={{root: styles.scrollbarContainer, view: styles.postBodyScrollbarView}}>
                                {props.body}
                            </Scrollbars>
                        </div>

                        <div className={styles.commentsWrapper}>
                            <h3 className={styles.commentsTitle}>Comments</h3>

                            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}
                                        renderThumbVertical={() => <div style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}/>}
                                        renderTrackHorizontal={props => <div {...props} style={{display: 'none'}}/>}
                                        classes={{view: styles.commentsScrollbarView}}>
                                {renderComments()}
                            </Scrollbars>
                        </div>
                    </>
            }
        </div>
    );
};

function mapStateToProps(state: IRootReducer): IPostCardStateProps {
    return {
        commentsOnPost: state.postsReducer.commentsOnPost
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, IPostAction> & Dispatch<IPostAction>): IPostCardDispatchProps {
    return {
        onGetCommentsOnPost: async (postId: number) => await dispatch(getCommentsOnPost(postId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);