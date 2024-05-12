import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { fetchMovie, resetMovie } from "../../../store/movieSingleSlice";
import MovieCardDetailed from "../../../components/movieCard/movieCardDetailed/MovieCardDetailed";
import styles from './index.module.css';

export default function Movie() {
  const dispatch = useAppDispatch();
  const { movie } = useAppSelector((state) => state.movie);
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () => () => {
      dispatch(resetMovie());
    },
    [dispatch]
  );

  useEffect(() => {
    if(id) {
      dispatch(fetchMovie(id.toString()));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.movie}>
      {movie && <MovieCardDetailed movie={movie} />}
    </div>
  );
}
