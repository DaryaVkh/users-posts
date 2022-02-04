import React, {FC} from 'react';
import styles from './loading.module.scss';

const Loading: FC = () => {
    return (
        <svg className={styles.loading}>
            <circle className={styles.loadingSvg} cx='50' cy='50' r='20' fill='none' strokeWidth='3' strokeMiterlimit='10' />
        </svg>
    );
};

export default Loading;