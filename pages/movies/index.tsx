import styles from './index.module.scss';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchMovies } from '../../store/moviesSlice';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { fetchGenresList } from '../../store/genresListSlice';
import { Filters } from '../../components/filters/Filters';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movies);
  const { genresList } = useAppSelector((state) => state.genresList);
  const searchParams = {
    primary_release_year: 2024,
    //with_genres: '14',
    /*"vote_average.lte": 5,
    "vote_average.gte": 4,*/
    //sort_by: 'original_title.asc',
    //page: 2
  };

  useEffect(() => {
    dispatch(fetchGenresList());
    dispatch(fetchMovies(searchParams));
  }, []);

  return (
    <div className={styles.movies}>
      <div className={styles.movieFilters}>
        { genresList && <Filters genres={genresList}/> }
      </div>
      <div className={styles.movieCards}>
        { movies && genresList && movies.map((item) =>
          <div key={item.id} className={styles.movieCardsItem}>
            <MovieCardLink movie={item} genres={genresList} />
          </div>)}
      </div>
    </div>
  );
}
