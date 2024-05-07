import { Movie } from '../../types/types';
import { imageLoader } from '../../utils/imageLoader';
import styles from './MovieCard.module.css';
import Image from 'next/image'

export default function MovieCard(props: Movie) {
  return (
    <div className={styles.movie}>
      <p>{props.original_title}</p>
      <p>{props.genre_ids}</p>
      <div>
        {props.poster_path &&
         <Image alt={props.original_title} loader={imageLoader} src={props.poster_path} width={119} height={170}></Image>
        }
      </div>
      <p>{props.vote_average}</p>
      <p>{props.vote_count}</p>
    </div>
  );
}
