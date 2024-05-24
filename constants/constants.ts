export const API_BASE_URL = 'https://api.themoviedb.org';

export const IMG_URL = 'https://image.tmdb.org/t/p/original';

export const API_ROUTES = {
    MOVIES: `${API_BASE_URL}/3/discover/movie`,
    MOVIE: `${API_BASE_URL}/3/movie`,
    GENRES: `${API_BASE_URL}/3/genre/movie/list`,
};

export const SORT_BY_DEFAULT_KEY = 'popularity.desc';
export const SORT_BY_DEFAULT_VALUE = 'Most Popular';

export const SortByData = {
    'original_title.asc': {
      key: 'original_title.asc',
      value: 'originalTitleAsc'
    },
    'original_title.desc': {
      key: 'original_title.desc',
      value: 'originalTitleDesk'
    },
    'popularity.asc': {
      key: 'popularity.asc',
      value: 'popularityAsc'
    },
    'popularity.desc': {
      key: 'popularity.desc',
      value: 'Most Popular'
    },
    'revenue.asc': {
      key: 'revenue.asc',
      value: 'revenueAsc'
    },
    'revenue.desc': {
      key: 'revenue.desc',
      value: 'revenueDesk'
    },
    'primary_release_date.asc': {
      key: 'primary_release_date.asc',
      value: 'primaryReleaseDateAsc'
    },
    'primary_release_date.desc': {
      key: 'primary_release_date.desc',
      value: 'primaryReleaseDateDesc'
    },
    'title.desc': {
      key: 'title.desc',
      value: 'titleDesc'
    },
    'vote_average.asc': {
      key: 'vote_average.asc',
      value: 'voteAverageAsc'
    },
    'vote_average.desc': {
      key: 'vote_average.desc',
      value: 'voteAverageDesc'
    },
    'vote_count.asc': {
      key: 'vote_count.asc',
      value: 'voteCountAsc'
    },
    'vote_count.desc': {
      key: 'vote_count.desc',
      value: 'voteCountDesc'
    }
}

export const COUNT_RATED_ON_PAGE = 4;
export const MAX_TOTAL_PAGES = 500;
export const MOVIES_ON_PAGE = 10;

export const PATHS = [
  {
    path: '/movies',
    title: 'Movies'
  },
  {
    path: '/rated-movies',
    title: 'Rated movies'
  }
];
