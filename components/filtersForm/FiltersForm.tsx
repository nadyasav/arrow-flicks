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
import { SORT_BY_DEFAULT_KEY, SORT_BY_DEFAULT_VALUE } from '../../constants/constants';
import { GetYearsArr } from '../../utils/getYearsArr';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from '@mantine/hooks';

interface IFilters{
  withGenres?: Array<string>;
  primaryReleaseYear?: number;
  voteAverageGte?: number;
  voteAverageLte?: number;
  sortBy: string;
}

const filtersEmptyValues = {
  withGenres: undefined,
  primaryReleaseYear: undefined,
  voteAverageLte: undefined,
  voteAverageGte: undefined,
  sortBy: SORT_BY_DEFAULT_VALUE
};

function FiltersForm(props: {genres: GenresList}) {
  const dispatch = useAppDispatch();
  const { filters, sortByData } = useAppSelector((state) => state.filters);
  const [formkey, setFormkey] = useState(Date.now());
  const [ yearsData ] = useState(GetYearsArr(RELEASE_YEAR_START));

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
    voteAverageGte: z.coerce.number().int().min(0).max(10).optional(),
    voteAverageLte: z.coerce.number().int().min(0).max(10).optional(),
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
      withGenres: filters.withGenres?.length ? getGenresNamesByIds(filters.withGenres, props.genres) : undefined,
      primaryReleaseYear: filters.primaryReleaseYear,
      voteAverageGte: filters.voteAverageGte,
      voteAverageLte: filters.voteAverageLte,
      sortBy: sortByData[filters.sortBy].value
    }
  });

  const isFiltersNotEmpty = () => {
    const values = getValues();
    return values.primaryReleaseYear ||
    values.sortBy !== SORT_BY_DEFAULT_VALUE ||
    values.voteAverageGte !== undefined ||
    values.voteAverageLte !== undefined ||
    values.withGenres && !!values.withGenres.length;
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

  function getSortKeyByValue (value: string) {
    const sortByDataItem = Object.values(sortByData).find((item) => item.value === value);
    return sortByDataItem?.key;
  }

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    reset({...filtersEmptyValues});
    setFormkey(Date.now());
  }, [dispatch, reset]);

  const onSubmit = useCallback((data: IFilters) => {
    if(!Object.keys(errors).length) {
      const genresIds = data.withGenres?.length ? getGenresIdsByNames(data.withGenres, props.genres) : undefined;
      const res = {
        withGenres: genresIds,
        primaryReleaseYear: data.primaryReleaseYear,
        voteAverageLte: data.voteAverageLte,
        voteAverageGte: data.voteAverageGte,
        sortBy: getSortKeyByValue(data.sortBy) || SORT_BY_DEFAULT_KEY
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
    setValue('voteAverageGte', Number(value), { shouldValidate: true })
  }, 200);

  const handleRatingToChange = useDebouncedCallback((value: string | number) => {
    setValue('voteAverageLte', Number(value), { shouldValidate: true })
  }, 200);

  return (
    <form className={styles.filters} key={formkey}>
      <div className={styles.filtersTop}>
        <div className={styles.filtersItem}>
          <Controller
            control={control}
            name='withGenres'
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
              name='voteAverageGte'
              render={({ field: { value } }) => (
                <NumberInput
                  label='Ratings'
                  placeholder='From'
                  classNames={NumberInputClasses}
                  onChange={handleRatingFromChange}
                  defaultValue={value}
                  error={errors && errors?.voteAverageGte?.message}
                  min={0}
                  max={10}
                />
              )}
            />
          </div>
          <div>
            <Controller
                control={control}
                name='voteAverageLte'
                render={({ field: { value } }) => (
                  <NumberInput
                    placeholder='To'
                    classNames={NumberInputClasses}
                    onChange={handleRatingToChange}
                    defaultValue={value}
                    error={errors && errors?.voteAverageLte?.message}
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
          disabled={!isFiltersNotEmpty()}
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
              data={Object.values(sortByData).map((item) => item.value)}
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
