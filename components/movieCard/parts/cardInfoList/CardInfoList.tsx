import { MovieCardSize } from '../../../../types/types';
import styles from './CardInfoList.module.css';
import cn from 'classnames';

interface IMovieInfoData {
  key: string;
  value: string;
}

interface ICardInfoList {
  data: Array<IMovieInfoData>;
  size?: MovieCardSize;
}

export const CardInfoList = ({ data, size }: ICardInfoList) => (
  <ul className={cn(styles.infoList, size && styles[size])}>
    {data.map((item) => (
      <li className={styles.listItem} key={item.key}>
        <span className={styles.key}>{item.key}</span>
        <span className={styles.value}>{item.value}</span>
      </li>
    ))}
  </ul>
);
