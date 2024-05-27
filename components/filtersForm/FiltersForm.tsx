import React, { memo, useCallback, useEffect, useState } from 'react';
import { GenresList, IFiltersForm, RELEASE_YEAR_START } from '../../types/types';
import { Button, MultiSelect } from '@mantine/core';
import styles from './FiltersForm.module.css';
import { useAppSelector } from '../../store/redux-hooks';
import { getGenresNamesArr, transformGenresValToKeys } from '../../utils/getGenres';

import MultiSelectClasses from './styles/MultiSelectClasses.module.css';
import textBtnClasses from '../../styles/textBtn.module.css';

import { IconChevronUp } from '@tabler/icons-react';
import { SORT_BY_DEFAULT_VALUE } from '../../constants/constants';
import { GetYearsArr } from '../../utils/getYearsArr';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledSelect } from '../styledSelect/StyledSelect';
import { filtersSchema } from './filtersSchema';
import FiltersFormService from '../../services/FiltersFormService';
import { CustomInputNumber } from '../customInputNumber/CustomInputNumber';

const formEmptyValues = {
  withGenres: undefined,
  primaryReleaseYear: undefined,
  rating: {
    voteAverageLte: undefined,
    voteAverageGte: undefined,
  },
  sortBy: SORT_BY_DEFAULT_VALUE
};

const filtersFormService = new FiltersFormService();

function FiltersForm(props: {genres: GenresList}) {
  const { sortByData } = useAppSelector((state) => state.filters);
  const [formkey, setFormkey] = useState(Date.now());
  const [ yearsData ] = useState(GetYearsArr(RELEASE_YEAR_START));

  filtersSchema.refine((data) => data.withGenres?.length ? transformGenresValToKeys(data.withGenres, props.genres) : true, {
    message: "invalid genres value",
    path: ['withGenres']});

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    watch,
    setValue,
    reset
  } = useForm<IFiltersForm>({
    resolver: zodResolver(filtersSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: filtersFormService.getDefaultFormData(),
  });

  const isFiltersNotEmpty = () => {
    const values = getValues();
    return values.primaryReleaseYear ||
    values.sortBy !== SORT_BY_DEFAULT_VALUE ||
    values.rating?.voteAverageGte !== undefined ||
    values.rating?.voteAverageLte !== undefined ||
    values.withGenres && !!values.withGenres.length;
  }

  const handleResetForm = useCallback(() => {
    reset({...formEmptyValues});
    setFormkey(Date.now());
  }, [reset]);

  const onSubmit = useCallback((data: IFiltersForm) => {
    filtersFormService.submitForm({...data});
  },[]);

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

  const handleRatingFromChange = useCallback((value: string | number) => {
    setValue('rating.voteAverageGte', typeof value === 'number' ? value : undefined, { shouldValidate: true })
  }, [setValue]);

  const handleRatingToChange = useCallback((value: string | number) => {
    setValue('rating.voteAverageLte', typeof value === 'number' ? value : undefined, { shouldValidate: true })
  }, [setValue]);

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
                <StyledSelect 
                  label='Release year'
                  placeholder='Select release year'
                  onChange={handleYearChange}
                  data={yearsData}
                  defaultValue={typeof value === 'number' ? value.toString() : undefined}
                  error={errors && errors.primaryReleaseYear && 'invalid yaers value'}
                  />
              )}
            />
        </div>
        <div className={styles.ratings}>
          <div>
          <Controller
              control={control}
              name='rating.voteAverageGte'
              render={({ field: { value } }) => (
                <CustomInputNumber
                  label='Ratings'
                  placeholder='From'
                  onChange={handleRatingFromChange}
                  defaultValue={value}
                  error={errors?.rating?.voteAverageGte?.message || errors.rating?.root?.message}
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
                render={({ field: { value } }) => (
                  <CustomInputNumber
                    placeholder='To'
                    onChange={handleRatingToChange}
                    defaultValue={value}
                    error={errors?.rating?.voteAverageLte?.message || errors.rating?.root?.message}
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
          onClick={handleResetForm}
          >Reset filters</Button>
      </div>
      <div className={styles.sort}>
        <Controller
          control={control}
          name='sortBy'
          render={({ field: { value } }) => (
            <StyledSelect
              label='Sort by'
              placeholder='Select sort type'
              onChange={handleSortChange}
              data={Object.values(sortByData).map((item) => item.value)}
              value={value || SORT_BY_DEFAULT_VALUE}
              error={errors && errors.sortBy && 'invalid sort value'}
            />
          )}
        />
      </div>
    </form>
  );
};

export default memo(FiltersForm);
