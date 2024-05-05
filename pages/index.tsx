import styles from './index.module.css';
import { useEffect, useState } from "react";
import { Movie, MoviesRes } from "../types/types";
import { request } from "../utils/request";
import MovieCard from "../components/movieCard/MovieCard";

export default function IndexPage() {
  const [movies, setMovies] = useState<Array<Movie>>();
  const [error, setError] = useState<boolean>();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  };

  const requestMovies = async () => {
    const { error, dataObj } = await request<MoviesRes>(`api/movies`);
    setError(error);
    if(dataObj) {
      console.log(dataObj);
      setMovies(dataObj.results);
    }
  }

  useEffect(() => {
    requestMovies();
  }, []);

  return (
    <div>
      <div className={styles.moviesCards}>
        {movies?.map((item) =>
          <MovieCard key={item.original_title} {...item}/> )}
      </div>
    </div>
  );
}
