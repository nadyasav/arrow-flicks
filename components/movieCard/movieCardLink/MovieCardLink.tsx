import Link from 'next/link';
import styles from './MovieCardLink.module.css';
import { Genre, Movie, MovieSingle } from '../../../types/types';
import CardPoster from '../parts/cardPoster/CardPoster';
import CardDescription from '../parts/cardDescription/CardDescription';
import { CardInfoList } from '../parts/cardInfoList/CardInfoList';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/redux-hooks';
import { addRated, removeRatedById } from '../../../store/ratedSlice';
import { getGenresNamesByIds, getGenresStr } from '../../../utils/getGenres';

interface IMovieCardLink {
  movie: Movie | MovieSingle;
  rating: number;
  genres: Array<Genre>;
  genresIds?: Array<number>;
}

export default function MovieCardLink({ movie, rating, genres, genresIds }: IMovieCardLink) {
  const dispatch = useAppDispatch();
  const [ genresStr ] = useState<string>(getGenresData());
  const [ vote, setVote ] = useState<number>(rating);

  function getGenresData() {
    if(genresIds !== undefined) {
      return genresIds.length ? getGenresNamesByIds(genresIds, genres).join(', ') : '';
    } else {
      return genres.length ? getGenresStr(genres) : '';
    }
  }

  const handleVoteBtnClick = () => {
    if (!rating) {
      //call popup
      dispatch(addRated({
        id: movie.id,
        rating: 8,
        title: movie.original_title
      }));
    } else {
      dispatch(removeRatedById(movie.id));
    }
  };

  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <CardPoster src={movie.poster_path} alt={movie.original_title}/>
      <CardDescription movie={movie} voteBtnOnClick={handleVoteBtnClick} rating={rating}>
        {genresStr &&
          <CardInfoList data={[{ key: 'Genres', value: genresStr }]}/>}
      </CardDescription>
    </Link>
  );
}
