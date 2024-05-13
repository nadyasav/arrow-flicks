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

interface IMovieCardDetailed {
  movie: MovieSingle;
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

export default function MovieCardDetailed({ movie }: IMovieCardDetailed) {
  const [cardInfo] = useState<Array<CardInfoListData>>(getCardInfoData(movie));

  const handleVoteBtnClick = () => {};

  return (
    <div className={styles.card}>
      <CardPoster src={movie.poster_path} alt={movie.original_title} size='lg'/>
      <CardDescription movie={movie} voteBtnOnClick={handleVoteBtnClick}>
        {!!cardInfo.length &&
            <CardInfoList 
              size='lg'
              data={cardInfo}/>}
      </CardDescription>
    </div>
  );
}
