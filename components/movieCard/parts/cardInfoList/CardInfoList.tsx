import { CardInfoListData, MovieCardSize } from '../../../../types/types';
import styles from './CardInfoList.module.css';
import cn from 'classnames';
import { Text } from '@mantine/core';

interface ICardInfoList {
  data: Array<CardInfoListData>;
  size?: MovieCardSize;
}

export const CardInfoList = ({ data, size }: ICardInfoList) => (
  <ul className={cn(styles.infoList, size && styles[size])}>
    {data.map((item) => (
      <li className={styles.listItem} key={item.key}>
        <span className={styles.key}>{item.key}</span>
        { size === 'sm' ?
          <Text lineClamp={2} component="span" className={styles.value}>
            {item.value}
          </Text> :
          <span className={styles.value}>{item.value}</span>}
      </li>
    ))}
  </ul>
);
