import { IMovie, MovieCardSize } from '../../../../types/types';
import styles from './CardDescription.module.scss';
import { VoteBtn } from '../../../voteBtn/VoteBtn';
import { RatingInfo } from '../../../ratingInfo/RatingInfo';
import { getSearchTextHighlighted } from '../../../../utils/getSearchTextHighlighted';
import cn from 'classnames';
import { Text } from '@mantine/core';

interface ICardDescription {
  movie: Omit<IMovie, "id" | "poster_path" | "genre_ids">;
  children?: React.ReactNode;
  voteBtnOnClick: () => void
  rating: number;
  searchValue?: string;
  size?: MovieCardSize;
}

export default function CardDescription(props: ICardDescription) {
  const { movie, children, voteBtnOnClick, rating, searchValue, size } = props;
  const votes = {
    average: movie.vote_average,
    count: movie.vote_count
  };

  return (
    <div className={cn(styles.description, size && styles[size])}>
      <div className={styles.descriptionTop}>
          {movie.original_title &&
            (size === 'sm' ?
              <Text lineClamp={2} component="div">
                <h2 className={styles.title}>{
                    searchValue ?
                    getSearchTextHighlighted(searchValue, movie.original_title) :
                    movie.original_title}
                  </h2>
              </Text> :
              <h2 className={styles.title}>{
                searchValue ?
                getSearchTextHighlighted(searchValue, movie.original_title) :
                movie.original_title}
              </h2>)}
        {movie.release_date && <p className={styles.data}>{new Date(movie.release_date).getFullYear()}</p>}
        <div>
          <RatingInfo {...votes}/>
        </div>
        <div className={styles.voteBtn}>
          <VoteBtn onClick={voteBtnOnClick} rating={rating}/>
        </div>
      </div>
      { children &&
      <div className={styles.genres}>
        {children}
      </div>}
    </div>
  );
}
