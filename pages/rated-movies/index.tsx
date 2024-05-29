import styles from './index.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchRatedMovies, setPage, setRatedIds } from '../../store/ratedSlice';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { getRatignById } from '../../utils/getRatingById';
import { SearchField } from '../../components/searchField/SearchField';
import CustomPagination from '../../components/customPagination/CustomPagination';
import { RequesStatus } from '../../types/types';
import { usePathname } from 'next/navigation';
import Preloader from '../../components/preloader/Preloader';
import EmptySearchState from '../../components/emptySearchState/EmptySearchState';
import EmptyState from '../../components/emptyState/EmptyState';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { ratedIds, ratedMovies, ratedStatus } = useAppSelector((state) => state.rated);
  const [searchValue, setSearchValue] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setRatedIds());
    return () => {
      dispatch(setPage(1))
    };
  },[dispatch]);

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
    <>
      {!!ratedIds.length ? 
        <div className={styles.movies}>
          <div className={styles.moviesTop}>
            <h1>Rated movies</h1>
            <div className={styles.searchField}>
              <SearchField onSearch={handleSearch} />
            </div>
          </div>
          <div className={styles.movieCards}>
            { !!ratedMovies.movies.length ?
              ratedMovies.movies.map((item) =>
              <div key={item.id} className={styles.movieCardsItem}>
                <MovieCardLink
                  movie={item}
                  rating={getRatignById(item.id, ratedIds)}
                  genres={item.genres}
                  searchValue={searchValue}
                  rootPath={pathname} />
              </div>) :
              !!searchValue &&
              ratedStatus !== RequesStatus.PENDING &&
              ratedStatus !== RequesStatus.INIT &&
              <EmptySearchState />}
          </div>
          { !!ratedMovies.movies.length &&
            <div className={styles.pagination}>
              <CustomPagination
                value={ratedMovies.page}
                onChange={handlePageOnChange}
                total={ratedMovies.totalPages}
                disabled={ratedStatus === RequesStatus.PENDING}
              />
            </div>}
          {ratedStatus === RequesStatus.PENDING && <Preloader />}
        </div> :
        ratedStatus !== RequesStatus.PENDING &&
        ratedStatus !== RequesStatus.INIT &&
        <EmptyState withLogo={false} type='movies' />}
    </>
  );
}
