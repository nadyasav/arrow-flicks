import { IMovie } from '../../../../types/types';
import styles from './CardDescription.module.scss';
import { VoteBtn } from '../../../voteBtn/VoteBtn';
import { RatingInfo } from '../../../ratingInfo/RatingInfo';

interface ICardDescription {
  movie: Omit<IMovie, "id" | "poster_path" | "genre_ids">;
  children?: React.ReactNode;
  voteBtnOnClick: () => void
  rating: number;
}

export default function CardDescription({ movie, children, voteBtnOnClick, rating }: ICardDescription) {
  const votes = {
    average: movie.vote_average,
    count: movie.vote_count
  };

  return (
    <div className={styles.description}>
      <div className={styles.descriptionTop}>
        <h2>{movie.original_title}</h2>
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
