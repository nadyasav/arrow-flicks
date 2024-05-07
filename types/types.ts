export enum RequesStatus {
    PENDING = 'pending',
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

export interface MoviesRes{
    page: number;
    results: Array<Movie>;
    total_pages: number;
    total_results: number;
}

export interface Movie {
    original_title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: Array<number>;
}

export interface ErrorRes {
    status_code: number;
    status_message: string;
    success: false;
}

export interface MoviesSearchParams {
    language?: string;
    with_genres?: string;
    primary_release_year?: number;
    "vote_average.lte"?: number;
    "vote_average.gte"?: number;
    sort_by?: string;
    page?: number;
  }
