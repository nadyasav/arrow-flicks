export enum RequesStatus {
    INIT = 'init',
    PENDING = 'pending',
    FULFILLED = "fulfilled",
    REJECTED = "rejected"
}

export enum MoviesSearchKeys {
    LANGUAGE = 'language',
    WITH_GENRES = "with_genres",
    PRIMARY_RELEASE_YEAR = "primary_release_year",
    VOTE_AVERAGE_LTE = "vote_average.lte",
    VOTE_AVERAGE_GTE = "vote_average.gte",
    SORT_BY = "sort_by",
    PAGE = "page"
}

export enum Language { EN = 'en-US' }
export enum appendToResponse { VIDEOS = 'videos' };
export const RELEASE_YEAR_START = 1874;

export type SortBy = 
    'original_title.asc' |
    'original_title.desc' |
    'popularity.asc' |
    'popularity.desc' |
    'revenue.asc' |
    'revenue.desc' |
    'primary_release_date.asc' |
    'title.desc' |
    'primary_release_date.desc' |
    'vote_average.asc' |
    'vote_average.desc' |
    'vote_count.asc' |
    'vote_count.desc';

export enum SortByKeysEnum {
    'original_title.asc' = 'original_title.asc',
    'original_title.desc' = 'original_title.desc',
    'popularity.asc' = 'popularity.asc',
    'popularity.desc' = 'popularity.desc',
    'revenue.asc' = 'revenue.asc',
    'revenue.desc' = 'revenue.desc',
    'primary_release_date.asc' = 'primary_release_date.asc',
    'title.desc' = 'title.desc',
    'primary_release_date.desc' = 'primary_release_date.desc',
    'vote_average.asc' = 'vote_average.asc',
    'vote_average.desc' = 'vote_average.desc',
    'vote_count.asc' = 'vote_count.asc',
    'vote_count.desc' = 'vote_count.desc'
}

export enum SortByValuesEnum {
    'originalTitleAsc' = 'originalTitleAsc',
    'originalTitleDesk' = 'originalTitleDesk',
    'popularityAsc' = 'popularityAsc',
    'Most Popular' = 'Most Popular',
    'revenueAsc' = 'revenueAsc',
    'revenueDesk' = 'revenueDesk',
    'primaryReleaseDateAsc' = 'primaryReleaseDateAsc',
    'titleDesc' = 'titleDesc',
    'primaryReleaseDateDesc' = 'primaryReleaseDateDesc',
    'voteAverageAsc' = 'voteAverageAsc',
    'voteAverageDesc' = 'voteAverageDesc',
    'voteCountAsc' = 'voteCountAsc',
    'voteCountDesc' = 'voteCountDesc'
}

export interface MoviesSearchParams {
    language?: Language.EN;
    with_genres?: string;
    primary_release_year?: number;
    "vote_average.lte"?: number;
    "vote_average.gte"?: number;
    sort_by?: SortBy;
    page?: number;
}

export interface GenreListEl {
    id: number;
    name: string;
}

export type GenresList = Array<GenreListEl>

export interface IFilters{
    withGenres: Array<number> | undefined;
    primaryReleaseYear: number | undefined;
    voteAverageLte: number | undefined;
    voteAverageGte: number | undefined;
    sortBy: SortBy;
}
export interface IFiltersSlice{
    sortByData: SortByDataType,
    filters: IFilters;
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

export interface MovieProductionCompanies{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface MovieVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}
export interface MovieSingle extends IMovie{
    runtime: number;
    budget: number;
    revenue: number;
    genres: Array<Genre>;
    overview: string;
    production_companies: Array<MovieProductionCompanies>;
    videos?: {
        results: Array<MovieVideo>
    };
}

export interface ErrorRes {
    status_code: number;
    status_message: string;
    success: false;
}

export interface Genre {
    id: number;
    name: string;
}

export type MovieCardSize = 'lg' | 'sm';

export interface CardInfoListData {
    key: string;
    value: string;
}

export interface RatedId {
    id: number;
    rating: number;
    title: string;
}

export interface IFetchRatedResData {
    movies: Array<MovieSingle>;
    page: number;
    totalPages: number;
}

export interface FetchRatedParams{
    page: number;
    searchValue: string;
}

export interface IFiltersForm{
    withGenres?: Array<string>;
    primaryReleaseYear?: number;
    rating: {
      voteAverageGte?: number;
      voteAverageLte?: number;
    };
    sortBy: string;
}

export type SortByDataType = Record<SortBy, { key: SortBy; value: string }>
