import { useState } from "react";
import { SORT_BY_DEFAULT_KEY } from "../constants/constants";
import { GenresList, IFilters, SortByKeysEnum } from "../types/types";
import { useUrlParams } from "./useUrlParams";
import { geFilteredGenres } from "../utils/getGenres";
import { filtersSchema, urlParamsSchema } from "../components/filtersForm/filtersSchema";

const defaultValues = {
  with_genres: undefined,
  primary_release_year: undefined,
  "vote_average.lte": undefined,
  "vote_average.gte": undefined,
  sort_by: SortByKeysEnum["popularity.desc"]
};

type FiltersKeys = keyof IFilters;

interface IErrors {
  [key: string]: string;
}

interface IUseFilters {
  filters: IFilters,
  errors: IErrors | null,
  handleChange: (name: FiltersKeys, value?: string | string[] | number ) => void,
  resetFilters: () => void,
  isFiltersNotEmpty: () => boolean
}

export function useFilters(genres: GenresList): IUseFilters {
  const { getUrlParams, setUrlParams } = useUrlParams();
  const [ errors, setErrors ] = useState<IErrors | null>(null);
  const [filters, setFilters] = useState<IFilters>(setInitValues);

  function setInitValues() {
    const urlParams = getUrlParams([...Object.keys(defaultValues)]);
    const result = validateInitValues(urlParams);
    setUrlParams(result);
    return result;
  }

  function validateInitValues(urlParams: {[key: string]: string | undefined}) {
    const schema = urlParamsSchema.transform((data) => ({
      ...data,
      with_genres: data.with_genres?.length ? geFilteredGenres(data.with_genres, genres) : undefined
    }))
    const params = schema.safeParse({...urlParams, with_genres: urlParams.with_genres?.split(",")});
    if(!params.data) {
      return { ...defaultValues };
    }
    const result = validate(params.data);
    return result.data;
  }

  const handleChange = (name: FiltersKeys, value?: string | string[] | number ) => {
    const result = validate({ ...filters, [name]: Array.isArray(value) && !value.length ? undefined : value });
    if(result.isValid) {
      setUrlParams<IFilters>(result.data);
    }
    setFilters(result.data);
  };

  function validate(params: IFilters) {
    const filters = filtersSchema.safeParse(params);
    let isValid = false;
    if(filters.error) {
      const errorsTemp: IErrors = {};
      filters.error.errors.map((item) => errorsTemp[item.path[0]] = item.message)
      setErrors(errorsTemp)
    }else {
      isValid = true;
      setErrors(null)
    }
    return {
      data: {...params, ...filters.data},
      isValid
    };
  }

  const resetFilters = () => {
    setFilters({...defaultValues});
    setErrors(null);
    setUrlParams(defaultValues);
  }

  const isFiltersNotEmpty = () => {
    return !!filters.primary_release_year ||
      filters.sort_by !== SORT_BY_DEFAULT_KEY ||
      filters['vote_average.gte'] !== undefined ||
      filters['vote_average.lte'] !== undefined ||
      filters.with_genres && !!filters.with_genres.length || false;
  }

  return {filters, errors, handleChange, resetFilters, isFiltersNotEmpty}
}
