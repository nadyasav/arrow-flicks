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
