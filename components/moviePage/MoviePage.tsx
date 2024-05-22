import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import Link from "next/link";
import { fetchMovie, resetMovie } from "../../store/movieSingleSlice";
import { Breadcrumbs } from "@mantine/core";
import MovieCardDetailed from "../movieCard/movieCardDetailed/MovieCardDetailed";
import MovieDetails from "../movieDetails/MovieDetails";
import { MovieSingle } from "../../types/types";
import { getRatignById } from "../../utils/getRatingById";
import styles from './MoviePage.module.css';
import { usePathname } from "next/navigation";
import { PATHS } from "../../constants/constants";

const getRootPath = (pathame: string) => {
  const rootPath = PATHS.find((item) => pathame?.startsWith(item.path));
  if(rootPath) {
    return rootPath;
  }
  return { title: '', path: ''};
}

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { movie } = useAppSelector((state) => state.movie);
  const { ratedIds } = useAppSelector((state) => state.rated);
  const pathame = usePathname();
  const rootLink = getRootPath(pathame)

  const breadcrumbsItems = [
    { title: rootLink.title, href: rootLink.path },
    { title: movie?.original_title, href: `${rootLink.path}/${id}` },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      {item.title}
    </Link>
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
          <MovieCardDetailed movie={movie} rating={getRatignById(movie.id, ratedIds)}/>

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
