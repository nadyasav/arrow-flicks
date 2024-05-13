import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { fetchMovie, resetMovie } from "../../../store/movieSingleSlice";
import MovieCardDetailed from "../../../components/movieCard/movieCardDetailed/MovieCardDetailed";
import styles from './index.module.css';
import { MovieSingle } from "../../../types/types";
import MovieDetails from "../../../components/movieDetails/MovieDetails";
import { Anchor, Breadcrumbs } from "@mantine/core";

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { movie } = useAppSelector((state) => state.movie);

  const breadcrumbsItems = [
    { title: 'Movies', href: '/movies' },
    { title: movie?.original_title, href: `/movies/${id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

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
      <Breadcrumbs className={styles.breadcrumbs}>{breadcrumbsItems}</Breadcrumbs>
      {movie && 
        <>
          <MovieCardDetailed movie={movie} />

          {hasAnyMovieDetails(movie) && 
            <MovieDetails videos={movie.videos?.results || []} 
              overview={movie.overview} companies={movie.production_companies} />}
        </>}
    </div>
  );
}

function hasAnyMovieDetails(movie: MovieSingle): boolean {
  return !!movie.overview || !!movie.production_companies.length || !!movie.videos?.results.length;
}
