import styles from './index.module.css';
import { useEffect } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { fetchMovies } from '../store/moviesSlice';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movies);
  const searchParams = {
    primary_release_year: 2024,
    with_genres: '14',
    "vote_average.lte": 4.5,
    "vote_average.gte": 4,
    sort_by: 'original_title.asc',
    page: 1
  };

  useEffect(() => {
    dispatch(
      fetchMovies(searchParams)
    );
  }, []);

  return (
    <div>
      <div className={styles.moviesCards}>
        { movies && movies.map((item) =>
          <MovieCard key={item.original_title} {...item}/> )}
      </div>
    </div>
  );
}
