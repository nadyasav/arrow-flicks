import styles from './MovieCardDetailed.module.css';
import { CardInfoListData, MovieSingle } from '../../../types/types';
import CardPoster from '../parts/cardPoster/CardPoster';
import CardDescription from '../parts/cardDescription/CardDescription';
import { CardInfoList } from '../parts/cardInfoList/CardInfoList';
import { useState } from 'react';
import { convertMinsToHourAndMins } from '../../../utils/convertMinsToHourAndMins';
import { formatDate } from '../../../utils/formatDate';
import { getFormatedNumber } from '../../../utils/getFormatedNumber';
import { getGenresStr } from '../../../utils/getGenres';
import { addRated, removeRatedById } from '../../../store/ratedSlice';
import { useAppDispatch } from '../../../store/redux-hooks';

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
    <div className={styles.card}>
      <CardPoster src={movie.poster_path} alt={movie.original_title} size='lg'/>
      <CardDescription movie={movie} voteBtnOnClick={handleVoteBtnClick} rating={rating}>
        {!!cardInfo.length &&
            <CardInfoList 
              size='lg'
              data={cardInfo}/>}
      </CardDescription>
    </div>
  );
}
