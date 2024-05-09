import Link from 'next/link';
import { Genre, Movie, MovieCardSize } from '../../types/types';
import { imageLoader } from '../../utils/imageLoader';
import styles from './MovieCard.module.scss';
import Image from 'next/image';
import { MovieInfoList } from '../movieInfoList/MovieInfoList';
import { IconStarFilled } from '@tabler/icons-react';
import { getGenresStrById } from '../../utils/getGenres';
import cn from 'classnames';

interface IMovieCard {
  movie: Movie;
  genres: Array<Genre>;
  size?: MovieCardSize;
}

const imageSizeValues = {
  sm:{
    width: 119,
    height: 170
  },
  lg: {
    width: 250,
    height: 352
  }
};

export default function MovieCard({ movie, genres, size='sm' }: IMovieCard) {
  return (
    <Link href={`/movies/${movie.id}`} className={cn(styles.card, styles[size])}>
      <div className={cn(styles.imgBox, !movie.poster_path && styles.empty)}>
        {movie.poster_path ?
          <Image alt={movie.original_title} loader={imageLoader} src={movie.poster_path} {...imageSizeValues[size]}></Image>
          : <Image src="/img/emptyPoster.svg" alt='' width={57} height={44}></Image>
        }
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionTop}>
          <h2>{movie.original_title}</h2>
          <p className={styles.data}>{new Date(movie.release_date).getFullYear()}</p>
          <p className={styles.rating}>
            <IconStarFilled size={26} color="#fab005"/>
            <span className={styles.ratingAverage}>{movie.vote_average}</span>
            <span className={styles.ratingCount}>({movie.vote_count})</span>
        </p>
        </div>
        {movie.genre_ids.length &&
          <div className={styles.movieInfo}>
            {size === 'sm' &&
            <MovieInfoList data={[
                { key: 'Genres', value: getGenresStrById(movie.genre_ids, genres) }
              ]}/>}
          </div>}
      </div>
    </Link>
  );
}
