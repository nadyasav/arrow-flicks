import styles from './index.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchRatedMovies, resetRated, setPage } from '../../store/ratedSlice';
import { Pagination } from '@mantine/core';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';
import { COUNT_RATED_ON_PAGE } from '../../constants/constants';
import { getRatignById } from '../../utils/getRatingById';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { ratedMovies, page, ratedIds } = useAppSelector((state) => state.rated);
  const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        if (ratedIds.length) {
            setTotalPages(ratedIds.length ? Math.ceil(ratedIds.length / COUNT_RATED_ON_PAGE) : page)
        } else {
            setTotalPages(1);
        }
    }, [dispatch, ratedIds, page]);

    useEffect(() => {
        if (ratedIds.length) {
            const totalPages = Math.ceil(ratedIds.length / COUNT_RATED_ON_PAGE);
            if (page > totalPages) {
                dispatch(setPage(totalPages))
            } else {
                dispatch(fetchRatedMovies(page));
            }
        } else {
            dispatch(resetRated());
        }
    }, [dispatch, ratedIds, page]);

    const handlePageOnChange = useCallback((value: number) => {
        dispatch(setPage(value))
    }, [dispatch]);

  return (
    <div className={styles.movies}>
      <h1 className={styles.title}>Rated movies</h1>
      <div className={styles.movieCards}>
        { !!ratedMovies.length && ratedMovies.map((item) =>
          <div key={item.id} className={styles.movieCardsItem}>
            <MovieCardLink movie={item} rating={getRatignById(item.id, ratedIds)} genres={item.genres} />
          </div>)}
      </div>
      { !!ratedMovies.length && <Pagination
          value={page}
          onChange={handlePageOnChange}
          total={totalPages}
        />}
    </div>
  );
}
