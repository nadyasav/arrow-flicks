import { IMovieInfoList } from '../../types/types';
import styles from './MovieInfoList.module.css';
import cn from 'classnames';

export const MovieInfoList = ({ data, size }: IMovieInfoList) => (
  <ul className={cn(styles.infoList, size && styles[size])}>
    {data.map((item) => (
      <li className={styles.item} key={item.key}>
        <span className={styles.key}>{item.key}</span>
        <span className={styles.value}>{item.value}</span>
      </li>
    ))}
  </ul>
);
