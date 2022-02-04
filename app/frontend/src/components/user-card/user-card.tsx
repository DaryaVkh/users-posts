import React, {FC} from 'react';
import styles from './user-card.module.scss';
import {IUserCardProps} from '../../entities/user-card/user-card.interfaces';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserCard: FC<IUserCardProps> = props => {
    return (
        <div className={styles.userCardWrapper}>
            <div className={styles.iconWrapper}>
                <AccountCircleIcon sx={{ width: '100%', height: '100%', '& path': { fill: 'rgba(0, 0, 0, 0.2)' } }} />
            </div>

            <div className={styles.userDataWrapper}>
                <div className={`${styles.sectionWrapper} ${styles.personalInfo}`}>
                    <h2 className={styles.title}>Personal information</h2>

                    <div className={styles.dataWrapper}>
                        <div className={styles.category}>Name:</div>
                        <div className={styles.data}>{props.name}</div>
                    </div>
                    <div className={styles.dataWrapper}>
                        <div className={styles.category}>Gender:</div>
                        <div className={styles.data}>{props.gender}</div>
                    </div>
                    <div className={styles.dataWrapper}>
                        <div className={styles.category}>E-mail:</div>
                        <div className={styles.data}>{props.email}</div>
                    </div>
                </div>

                <div className={styles.sectionWrapper}>
                    <h2 className={styles.title}>General information</h2>

                    <div className={styles.dataWrapper}>
                        <div className={styles.category}>Status:</div>
                        <div className={`${styles.data} ${props.status === 'inactive' ? styles.inactive : styles.active}`}>{props.status}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;