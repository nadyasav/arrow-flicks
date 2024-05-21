import Link from 'next/link';
import styles from './MovieCardLink.module.css';
import { Genre, Movie, MovieSingle } from '../../../types/types';
import CardPoster from '../parts/cardPoster/CardPoster';
import CardDescription from '../parts/cardDescription/CardDescription';
import { CardInfoList } from '../parts/cardInfoList/CardInfoList';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../store/redux-hooks';
import { addRated, removeRatedById } from '../../../store/ratedSlice';
import { getGenresNamesByIds, getGenresStr } from '../../../utils/getGenres';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import RatingWindow from '../../ratingWindow/RatingWindow';
import modalClasses from '../../../styles/modal.module.css';

interface IMovieCardLink {
  movie: Movie | MovieSingle;
  rating: number;
  genres: Array<Genre>;
  genresIds?: Array<number>;
  searchValue?: string;
}

export default function MovieCardLink(props: IMovieCardLink) {
  const { movie, rating, genres, genresIds, searchValue } = props;
  const dispatch = useAppDispatch();
  const [ genresStr ] = useState<string>(getGenresData());
  const [opened, { open, close }] = useDisclosure(false);

  function getGenresData() {
    if(genresIds !== undefined) {
      return genresIds.length ? getGenresNamesByIds(genresIds, genres).join(', ') : '';
    } else {
      return genres.length ? getGenresStr(genres) : '';
    }
  }

  const handleRatingSave = useCallback((value: number) => {
    if (value) {
      dispatch(addRated({
        id: movie.id,
        rating: value,
        title: movie.original_title || ''
      }));
    } else {
      dispatch(removeRatedById(movie.id));
    }
  }, [dispatch, movie.id, movie.original_title]);

  return (
    <>
      <Link href={`/movies/${movie.id}`} className={styles.card}>
        <CardPoster src={movie.poster_path} alt={movie.original_title || ''} />
        <CardDescription movie={movie} voteBtnOnClick={open} rating={rating} searchValue={searchValue} size='sm'>
          {genresStr &&
            <CardInfoList data={[{ key: 'Genres', value: genresStr }]} size='sm' />}
        </CardDescription>
      </Link>
      <Modal opened={opened} onClose={close} title="Rating" centered
        classNames={{
          ...modalClasses,
          content: styles.ratingModal
        }} >
        <RatingWindow title={movie.original_title} rating={rating} onSave={handleRatingSave}/>
      </Modal>
    </>
  );
}
