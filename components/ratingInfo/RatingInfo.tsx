import styles from './RatingInfo.module.css';
import { useMantineTheme } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { getStrRoundedNumber } from '../../utils/getStrRoundedNumber';

interface IRatingInfo {
    average: number;
    count: number;
}

export const RatingInfo = (props: IRatingInfo) => {
    const theme = useMantineTheme();
    const iconColor = props.average ? theme.other.colors.yellow : theme.other.colors.grey[2];

    return (
        <div className={styles.ratingInfo}>
            <IconStarFilled size={26} color={iconColor}/>
            <span className={styles.ratingAverage}>{props.average}</span>
            <span className={styles.ratingCount}>({props.count ? getStrRoundedNumber(props.count) : '0'})</span>
        </div>
    );
};
