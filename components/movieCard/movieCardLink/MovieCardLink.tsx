import Link from 'next/link';
import styles from './MovieCardLink.module.css';
import { Genre, Movie } from '../../../types/types';
import CardPoster from '../parts/cardPoster/CardPoster';
import CardDescription from '../parts/cardDescription/CardDescription';
import { CardInfoList } from '../parts/cardInfoList/CardInfoList';
import { getGenresNamesByIds } from '../../../utils/getGenres';
import { useState } from 'react';

interface IMovieCardLink {
  movie: Movie;
  genres: Array<Genre>;
}

export default function MovieCardLink({ movie, genres }: IMovieCardLink) {
  const [ genresStr ] = useState<string>(movie.genre_ids ? getGenresNamesByIds(movie.genre_ids, genres).join(', ') : '');
  const handleVoteBtnClick = () => {};

  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <CardPoster src={movie.poster_path} alt={movie.original_title}/>
      <CardDescription movie={movie} voteBtnOnClick={handleVoteBtnClick}>
        {genresStr &&
          <CardInfoList data={[{ key: 'Genres', value: genresStr }]}/>}
      </CardDescription>
    </Link>
  );
}
