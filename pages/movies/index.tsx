import styles from './index.module.scss';
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchMovies, setPage } from '../../store/moviesSlice';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { fetchGenresList } from '../../store/genresListSlice';
import { getRatignById } from '../../utils/getRatingById';
import CustomPagination from '../../components/customPagination/CustomPagination';
import { RequesStatus } from '../../types/types';
import { usePathname } from 'next/navigation';
import FiltersForm from '../../components/filtersForm/FiltersForm';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { movies, page, totalPages, moviesStatus } = useAppSelector((state) => state.movies);
  const { genresList } = useAppSelector((state) => state.genresList);
  const { ratedIds } = useAppSelector((state) => state.rated);
  const pathname = usePathname();
  const { filters } = useAppSelector((state) => state.filters);

  useEffect(() => {
    if(!genresList.length) {
      dispatch(fetchGenresList());
    }
  }, [dispatch, genresList.length]);

  const updateMovies = useCallback(() => {
    console.log(filters)
    const searchParams = {
      primary_release_year: filters.primaryReleaseYear,
      with_genres: filters.withGenres?.length ? filters.withGenres.join() : undefined,
      "vote_average.lte": filters.voteAverageLte,
      "vote_average.gte": filters.voteAverageGte,
      sort_by: filters.sortBy,
      page
    };

    dispatch(fetchMovies(searchParams));
  },[dispatch, page, filters])

  useEffect(() => {
    updateMovies();
  }, [dispatch, updateMovies]);

  const handlePageOnChange = useCallback((value: number) => {
    dispatch(setPage(value))
  }, [dispatch]);

  return (
    <div className={styles.movies}>
      <h1 className={styles.title}>Movies</h1>
      <div className={styles.movieFilters}>
        { !!genresList.length && <FiltersForm genres={genresList}/> }
      </div>
      <div className={styles.movieCards}>
        { !!movies.length && !!genresList.length && movies.map((item) =>
          <div key={item.id} className={styles.movieCardsItem}>
            <MovieCardLink 
            movie={item} 
            genres={genresList} 
            rating={getRatignById(item.id, ratedIds)} 
            genresIds={item.genre_ids || []}
            rootPath={pathname} />
          </div>)}
      </div>
      { !!movies.length && 
        <div className={styles.pagination}>
          <CustomPagination
            value={page}
            onChange={handlePageOnChange}
            total={totalPages}
            disabled={moviesStatus === RequesStatus.PENDING}
          />
        </div>}
    </div>
  );
}
