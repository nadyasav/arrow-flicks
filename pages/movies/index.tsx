import styles from './index.module.scss';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fetchMovies } from '../../store/moviesSlice';
import MovieCardLink from '../../components/movieCard/movieCardLink/MovieCardLink';

export default function IndexPage() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movies);
  const searchParams = {
    /*primary_release_year: 2024,
    with_genres: '14',*/
    /*"vote_average.lte": 5,
    "vote_average.gte": 4,*/
    /*sort_by: 'original_title.asc',
    page: 1*/
  };

  const genres = [
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    }
  ];

  useEffect(() => {
    dispatch(
      fetchMovies(searchParams)
    );
  }, []);

  return (
    <div>
      <div className={styles.movieCards}>
        { movies && movies.map((item) =>
          <div key={item.id} className={styles.movieCardsItem}>
            <MovieCardLink movie={item} genres={genres} />
          </div>)}
      </div>
    </div>
  );
}
