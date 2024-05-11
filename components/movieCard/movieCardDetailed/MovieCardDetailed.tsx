import styles from './MovieCardLink.module.css';
import { MovieDetails } from '../../../types/types';
import CardPoster from '../parts/cardPoster/CardPoster';
import CardDescription from '../parts/cardDescription/CardDescription';

interface IMovieCardDetailed {
  movie: MovieDetails;
}

export default function MovieCardDetailed({ movie }: IMovieCardDetailed) {
  const handleVoteBtnClick = () => {};

  return (
    <div className={styles.card}>
      <CardPoster src={movie.poster_path} alt={movie.original_title}/>
      <CardDescription movie={movie} voteBtnOnClick={handleVoteBtnClick}>
      </CardDescription>
    </div>
  );
}
