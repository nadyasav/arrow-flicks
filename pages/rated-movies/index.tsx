import styles from './index.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchRatedMovies, setPage } from '../../store/ratedSlice';
import { Pagination } from '@mantine/core';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { getRatignById } from '../../utils/getRatingById';
import { SearchField } from '../../components/searchField/SearchField';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { ratedIds, ratedMovies } = useAppSelector((state) => state.rated);
  const [searchValue, setSearchValue] = useState('');

  useEffect(
    () => () => {
      dispatch(setPage(1));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchRatedMovies({
      page: ratedMovies.page,
      searchValue
    }));
  }, [dispatch, ratedMovies.page, searchValue, ratedIds]);

  const handlePageOnChange = useCallback((value: number) => {
      dispatch(setPage(value))
  }, [dispatch]);

  const handleSearch = useCallback((value: string) => {
    dispatch(setPage(1));
    setSearchValue(value)
  }, [dispatch]);

  return (
    <div className={styles.movies}>
      <div className={styles.moviesTop}>
        <h1>Rated movies</h1>
        <div className={styles.searchField}>
          <SearchField onSearch={handleSearch} />
        </div>
      </div>
      <div className={styles.movieCards}>
        { !!ratedMovies.movies.length && ratedMovies.movies.map((item) =>
          <div key={item.id} className={styles.movieCardsItem}>
            <MovieCardLink movie={item} rating={getRatignById(item.id, ratedIds)} genres={item.genres} />
          </div>)}
      </div>
      { !!ratedMovies.movies.length && 
        <div className={styles.pagination}>
          <Pagination
            value={ratedMovies.page}
            onChange={handlePageOnChange}
            total={ratedMovies.totalPages}
          />
        </div>}
    </div>
  );
}
