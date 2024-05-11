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

export interface IMovie {
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}
export interface Movie extends IMovie{
    genre_ids: Array<number>;
}

export interface MovieDetails extends IMovie{
    runtime: string;
    budget: string;
    revenue: string;
    genres: Array<Genre>;
    overview: string;
    production_companies: string;
    videos: string;
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

export interface Genre {
    id: number;
    name: string;
}

export type MovieCardSize = 'lg' | 'sm';
