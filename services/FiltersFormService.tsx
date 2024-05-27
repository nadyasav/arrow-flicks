import { getGenresIdsByNames, getGenresNamesByIds } from "../utils/getGenres";
import { store } from "../store/store";
import { setFilters } from "../store/filtersSlice";
import { SORT_BY_DEFAULT_KEY } from "../constants/constants";
import { IFilters, IFiltersForm, SortByDataType } from "../types/types";

class FiltersFormService {
  public getDefaultFormData = () => {
    const { genresList } = store.getState().genresList;
    const { filters, sortByData } = store.getState().filters;

    const data = {
      withGenres: filters.withGenres?.length ? getGenresNamesByIds(filters.withGenres, genresList) : undefined,
      primaryReleaseYear: filters.primaryReleaseYear,
      rating: {
        voteAverageGte: filters.voteAverageGte,
        voteAverageLte: filters.voteAverageLte,
      },
      sortBy: sortByData[filters.sortBy].value
    }

    return data;
  }

  public submitForm = (data: IFiltersForm) => {
    const { genresList } = store.getState().genresList;
    const { filters, sortByData } = store.getState().filters;

    const genresIds = data.withGenres?.length ? getGenresIdsByNames(data.withGenres, genresList) : undefined;
    const filtersNewData: IFilters = {
      withGenres: genresIds,
      primaryReleaseYear: data.primaryReleaseYear,
      voteAverageLte: data.rating.voteAverageLte,
      voteAverageGte: data.rating.voteAverageGte,
      sortBy: this.getSortKeyByValue(data.sortBy, sortByData) || SORT_BY_DEFAULT_KEY
    }

    if(this.isNewValues(filters, filtersNewData)) {
      store.dispatch(setFilters(filtersNewData));
    }
  }

  private getSortKeyByValue (value: string, sortByData: SortByDataType) {
    const sortByDataItem = Object.values(sortByData).find((item) => item.value === value);
    return sortByDataItem?.key;
  }

  private isNewValues(filters: IFilters, newData: IFilters): boolean {
    return filters.primaryReleaseYear !== newData.primaryReleaseYear ||
    filters.sortBy !== newData.sortBy ||
    filters.voteAverageGte !== newData.voteAverageGte ||
    filters.voteAverageLte !== newData.voteAverageLte ||
    filters.withGenres?.length !== newData.withGenres?.length
  }
}

export default FiltersFormService;
