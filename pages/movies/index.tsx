import styles from './index.module.scss';
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchMovies } from '../../store/moviesSlice';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { fetchGenresList } from '../../store/genresListSlice';
import Filters from '../../components/filters/Filters';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movies);
  const { genresList } = useAppSelector((state) => state.genresList);
  const { withGenres, primaryReleaseYear, voteAverageLte, voteAverageGte, sortBy } = useAppSelector((state) => state.filters);

  useEffect(() => {
    if(!genresList.length) {
      dispatch(fetchGenresList());
    }
  }, [dispatch, genresList.length]);

  const updateMovies = useCallback(() => {
    const searchParams = {
      primary_release_year: primaryReleaseYear,
      with_genres: !!withGenres?.length ? withGenres : undefined,
      "vote_average.lte": voteAverageLte,
      "vote_average.gte": voteAverageGte,
      sort_by: sortBy
    };

    dispatch(fetchMovies(searchParams));
  },[dispatch, primaryReleaseYear, sortBy, voteAverageGte, voteAverageLte, withGenres])

  useEffect(() => {
    updateMovies();
  }, [dispatch, updateMovies]);

  return (
    <div className={styles.movies}>
      <h1 className={styles.title}>Movies</h1>
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
