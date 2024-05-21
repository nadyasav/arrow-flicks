import styles from './MovieCardDetailed.module.css';
import { CardInfoListData, MovieSingle } from '../../../types/types';
import CardPoster from '../parts/cardPoster/CardPoster';
import CardDescription from '../parts/cardDescription/CardDescription';
import { CardInfoList } from '../parts/cardInfoList/CardInfoList';
import { useCallback, useState } from 'react';
import { convertMinsToHourAndMins } from '../../../utils/convertMinsToHourAndMins';
import { formatDate } from '../../../utils/formatDate';
import { getFormatedNumber } from '../../../utils/getFormatedNumber';
import { getGenresStr } from '../../../utils/getGenres';
import { addRated, removeRatedById } from '../../../store/ratedSlice';
import { useAppDispatch } from '../../../store/redux-hooks';
import { Modal } from '@mantine/core';
import RatingWindow from '../../ratingWindow/RatingWindow';
import { useDisclosure } from '@mantine/hooks';
import modalClasses from '../../../styles/modal.module.css';

interface IMovieCardDetailed {
  movie: MovieSingle;
  rating: number;
}

function getCardInfoData(movie: MovieSingle) {
  const data = [
    { key: 'Duration', value: movie.runtime ? convertMinsToHourAndMins(movie.runtime) : '' },
    { key: 'Premiere', value: movie.release_date ? formatDate(movie.release_date) : '' },
    { key: 'Budget', value: movie.budget ? getFormatedNumber(movie.budget) : '' },
    { key: 'Gross worldwide', value: movie.revenue ? getFormatedNumber(movie.revenue) : '' },
    { key: 'Genres', value: movie.genres ? getGenresStr(movie.genres) : '' }
  ];

  return data.filter((item) => !!item.value);
}

export default function MovieCardDetailed({ movie, rating }: IMovieCardDetailed) {
  const dispatch = useAppDispatch();
  const [cardInfo] = useState<Array<CardInfoListData>>(getCardInfoData(movie));
  const [opened, { open, close }] = useDisclosure(false);

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
      <div className={styles.card}>
        <CardPoster src={movie.poster_path} alt={movie.original_title} size='lg' />
        <CardDescription movie={movie} voteBtnOnClick={open} rating={rating}>
          {!!cardInfo.length &&
            <CardInfoList
              size='lg'
              data={cardInfo} />}
        </CardDescription>
      </div>
      <Modal opened={opened} onClose={close} title="Rating" centered
        classNames={{
          ...modalClasses,
          content: styles.ratingModal
        }} >
        <RatingWindow title={movie.original_title} rating={rating} onSave={handleRatingSave} />
      </Modal>
    </>
  );
}
