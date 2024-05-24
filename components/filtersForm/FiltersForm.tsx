import React, { memo, useCallback, useEffect, useState } from 'react';
import { GenresList, RELEASE_YEAR_START, SortByValuesEnum } from '../../types/types';
import { Button, MultiSelect, NumberInput, Select } from '@mantine/core';
import styles from './FiltersForm.module.css';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { resetFilters, setFilters } from '../../store/filtersSlice';
import { getGenresIdsByNames, getGenresNamesArr, getGenresNamesByIds } from '../../utils/getGenres';

import MultiSelectClasses from './styles/MultiSelectClasses.module.css';
import SelectClasses from './styles/SelectClasses.module.css';
import textBtnClasses from '../../styles/textBtn.module.css';
import NumberInputClasses from './styles/NumberInputClasses.module.css';

import { IconChevronUp } from '@tabler/icons-react';
import { SORT_BY_DEFAULT_KEY, SORT_BY_DEFAULT_VALUE, SortByData } from '../../constants/constants';
import { GetYearsArr } from '../../utils/getYearsArr';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from '@mantine/hooks';

interface IFilters{
  withGenres?: Array<string>;
  primaryReleaseYear?: number;
  rating: {
    voteAverageGte?: number;
    voteAverageLte?: number;
  }
  sortBy: string;
}

function FiltersForm(props: {genres: GenresList}) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);
  const [formkey, setFormkey] = useState(Date.now());
  const [genresSelected, setGenresSelected] = useState<Array<string> | undefined>(
    filters.withGenres?.length ? getGenresNamesByIds(filters.withGenres, props.genres) : undefined);
  const [ yearsData ] = useState(GetYearsArr(RELEASE_YEAR_START));
  const [sortByVal] = useState(transformSortByKeyToValue(filters.sortBy));
  /*const [ratingFrom, setRatingFrom] = useDebouncedState(filters.voteAverageGte, 1000);
  const [ratingTo, setRatingTo] = useDebouncedState(filters.voteAverageLte, 1000);*/

  const schema = z
  .object({
    withGenres: z
      .string()
      .array()
      .transform((value, ctx) => transformGenresValToKeys(value, ctx) ? value : undefined)
      .optional(),
    primaryReleaseYear: z
      .coerce.number()
      .int()
      .min(RELEASE_YEAR_START)
      .max(new Date().getFullYear())
      .optional(),
    sortBy: z.nativeEnum(SortByValuesEnum),
    rating: z.object({
      voteAverageGte: z.coerce.number().int().min(0).max(10).optional(),
      voteAverageLte: z.coerce.number().int().min(0).max(10).optional(),
    })/*.refine((data) => (data.voteAverageLte < data.voteAverageGte), {
      message: "max rating value less than min",
      path: ['rating']
    })*/
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
    setValue,
    reset
  } = useForm<IFilters>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      sortBy: sortByVal
    }
  });

  const isFiltersEmpty = () => {
    const notEmptyValues = Object.values(getValues()).filter((item) => item !== SORT_BY_DEFAULT_VALUE && !!item);
    return notEmptyValues.length > 0;
  }

  function transformGenresValToKeys(value: Array<string>, ctx: z.RefinementCtx) {
    if(!value.length) {
      return '';
    }
    const genresIds = getGenresIdsByNames(value, props.genres);
    if (!genresIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "invalid genres value",
      });
      return undefined;
    }
    return genresIds.join();
  }

  function transformSortByValToKey (value: string) {
    const sortByDataItem = Object.values(SortByData).find((item) => item.value === value);
    return sortByDataItem?.key || SORT_BY_DEFAULT_KEY;
  }

  function transformSortByKeyToValue (key: string) {
    const sortByDataItem = Object.values(SortByData).find((item) => item.key === key);
    return sortByDataItem?.value || SORT_BY_DEFAULT_VALUE;
  }

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    setGenresSelected(undefined);
    reset();
    setFormkey(Date.now());
  }, [dispatch, reset]);

  const onSubmit = useCallback((data: IFilters) => {
    if(!Object.keys(errors).length) {
      console.log(data.withGenres)
      const genresIds = data.withGenres?.length ? getGenresIdsByNames(data.withGenres, props.genres) : undefined;
      const res = {
        withGenres: genresIds,
        primaryReleaseYear: data.primaryReleaseYear,
        voteAverageLte: data.rating.voteAverageLte,
        voteAverageGte: data.rating.voteAverageGte,
        sortBy: transformSortByValToKey(data.sortBy)
      }
      dispatch(setFilters(res));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, errors]);

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)())
    return () => subscription.unsubscribe()
  }, [handleSubmit, onSubmit, watch])


  const handleYearChange = useCallback((value: string | null) => {
    setValue('primaryReleaseYear', value ? Number(value) : undefined, { shouldValidate: true })
  },[setValue]);

  const handleSortChange = useCallback((value: string | null) => {
    setValue('sortBy', value ? value : SORT_BY_DEFAULT_VALUE, { shouldValidate: true })
  },[setValue]);

  const handleRatingFromChange = useDebouncedCallback((value: string | number) => {
    setValue('rating.voteAverageGte', value ? Number(value) : undefined, { shouldValidate: true })
  }, 200);

  const handleRatingToChange = useDebouncedCallback((value: string | number) => {
    setValue('rating.voteAverageLte', value ? Number(value) : undefined, { shouldValidate: true })
  }, 200);

  return (
    <form className={styles.filters} key={formkey}>
      <div className={styles.filtersTop}>
        <div className={styles.filtersItem}>
          <Controller
            control={control}
            name='withGenres'
            defaultValue={genresSelected}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                name="withGenres"
                label="Genres"
                placeholder="Select genre"
                data={getGenresNamesArr(props.genres)}
                onChange={onChange}
                defaultValue={value}
                withCheckIcon={false}
                classNames={MultiSelectClasses}
                error={errors && errors.withGenres && 'invalid genres values'}
                rightSection={<IconChevronUp />}
                />
            )}
          />
        </div>
        <div className={styles.filtersItem}>
            <Controller
              control={control}
              name='primaryReleaseYear'
              defaultValue={filters.primaryReleaseYear}
              render={({ field: { value } }) => (
                <Select
                  label='Release year'
                  placeholder='Select release year'
                  onChange={handleYearChange}
                  data={yearsData}
                  defaultValue={typeof value === 'number' ? value.toString() : undefined}
                  withCheckIcon={false}
                  classNames={SelectClasses}
                  error={errors && errors.primaryReleaseYear && 'invalid yaers value'}
                  rightSection={<IconChevronUp />}
                />
              )}
            />
        </div>
        <div className={styles.ratings}>
          <div>
          <Controller
              control={control}
              name='rating.voteAverageGte'
              defaultValue={filters.voteAverageGte}
              render={({ field: { onChange, value } }) => (
                <NumberInput
                  label='Ratings'
                  placeholder='From'
                  classNames={NumberInputClasses}
                  onChange={handleRatingFromChange}
                  defaultValue={value}
                  error={errors && errors.rating?.voteAverageGte?.message}
                  min={0}
                  max={10}
                />
              )}
            />
          </div>
          <div>
            <Controller
                control={control}
                name='rating.voteAverageLte'
                defaultValue={filters.voteAverageLte}
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    placeholder='To'
                    classNames={NumberInputClasses}
                    onChange={handleRatingToChange}
                    defaultValue={value}
                    error={errors && errors.rating?.voteAverageLte?.message}
                    min={0}
                    max={10}
                  />
                )}
              />
          </div>
        </div>
        <Button 
          variant="transparent" 
          className={styles.resetBtn} 
          classNames={textBtnClasses}
          disabled={!isFiltersEmpty()}
          onClick={handleResetFilters}
          >Reset filters</Button>
      </div>
      <div className={styles.sort}>
        <Controller
          control={control}
          name='sortBy'
          render={({ field: { value } }) => (
            <Select
              label='Sort by'
              placeholder='Select sort type'
              onChange={handleSortChange}
              data={Object.values(SortByData).map((item) => item.value)}
              value={value || SORT_BY_DEFAULT_VALUE}
              withCheckIcon={false}
              classNames={SelectClasses}
              error={errors && errors.sortBy && 'invalid sort value'}
              rightSection={<IconChevronUp />}
            />
          )}
        />
      </div>
    </form>
  );
};

export default memo(FiltersForm);
