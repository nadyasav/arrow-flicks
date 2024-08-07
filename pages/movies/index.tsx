import styles from './index.module.scss';
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchMovies, setPage } from '../../store/moviesSlice';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { fetchGenresList } from '../../store/genresListSlice';
import { getRatignById } from '../../utils/getRatingById';
import CustomPagination from '../../components/customPagination/CustomPagination';
import { FiltersRequestParams, MoviesSearchParams, RequesStatus } from '../../types/types';
import { usePathname } from 'next/navigation';
import Preloader from '../../components/preloader/Preloader';
import EmptySearchState from '../../components/emptySearchState/EmptySearchState';
import FiltersForm from '../../components/filtersForm/FiltersForm';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { movies, page, totalPages, moviesStatus } = useAppSelector((state) => state.movies);
  const { genresList, genresListStatus } = useAppSelector((state) => state.genresList);
  const { ratedIds } = useAppSelector((state) => state.rated);
  const pathname = usePathname();
  const prevSearchParams = useRef<MoviesSearchParams>();

  useEffect(() => {
    if(!genresList.length) {
      dispatch(fetchGenresList());
    }
  }, [dispatch, genresList.length]);

  const updateMovies = useCallback((params: FiltersRequestParams) => {
    const searchParams = {
      ...params,
      page
    }

    const requestMovies = () => {
      console.log('searchParams : ', searchParams);
      prevSearchParams.current = {...searchParams};
      dispatch(fetchMovies(searchParams));
    };

    if(!prevSearchParams.current) {
      requestMovies();
    } else if(isNewSearchParams(prevSearchParams.current, searchParams)){
      if(page === prevSearchParams.current.page && page !== 1) {
        dispatch(setPage(1))
      } else {
        requestMovies();
      }
    }

  },[dispatch, page])

  const handlePageOnChange = useCallback((value: number) => {
    dispatch(setPage(value))
  }, [dispatch]);

  return (
    <>
    <div className={styles.movies}>
      <h1 className={styles.title}>Movies</h1>
      <div className={styles.movieFilters}>
        { !!genresList.length && <FiltersForm genres={genresList} onSubmit={updateMovies}/> }
      </div>
      <div className={styles.movieCards}>
        { !!movies.length && !!genresList.length ?
          movies.map((item) =>
          <div key={item.id} className={styles.movieCardsItem}>
            <MovieCardLink 
            movie={item} 
            genres={genresList} 
            rating={getRatignById(item.id, ratedIds)} 
            genresIds={item.genre_ids || []}
            rootPath={pathname} />
          </div>) :
          moviesStatus !== RequesStatus.PENDING &&
          moviesStatus !== RequesStatus.INIT &&
          moviesStatus !== RequesStatus.REJECTED &&
          <EmptySearchState />}
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
    {(moviesStatus === RequesStatus.PENDING ||
      genresListStatus === RequesStatus.PENDING) && <Preloader />}
      </>
  );
}

const isNewSearchParams = (prevParams: MoviesSearchParams, params: MoviesSearchParams): boolean => {
  const prevArr = Object.values(prevParams);
  const nextArr = Object.values(params);
  for(let i = 0; i < prevArr.length; i++){
    if(prevArr[i] !== nextArr[i]) {
      return true
    }
  }
  return false;
}
