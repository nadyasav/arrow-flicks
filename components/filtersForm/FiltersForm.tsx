import React, { memo, useCallback, useEffect, useState } from 'react';
import { FiltersRequestParams, GenresList, MoviesSearchKeys, RELEASE_YEAR_START, SortByDataType } from '../../types/types';
import { Button, MultiSelect } from '@mantine/core';
import styles from './FiltersForm.module.css';
import { getGenresIdsByNames, getGenresNamesArr } from '../../utils/getGenres';

import MultiSelectClasses from './styles/MultiSelectClasses.module.css';
import textBtnClasses from '../../styles/textBtn.module.css';

import { IconChevronUp } from '@tabler/icons-react';
import { SORT_BY_DATA, SORT_BY_DEFAULT_KEY } from '../../constants/constants';
import { GetYearsArr } from '../../utils/getYearsArr';
import { StyledSelect } from '../styledSelect/StyledSelect';
import { CustomInputNumber } from '../customInputNumber/CustomInputNumber';
import { useFilters } from '../../services/useFiltersValidation';

function FiltersForm(props: {genres: GenresList, onSubmit: (params: FiltersRequestParams) => void}) {
  const [formkey, setFormkey] = useState(Date.now());
  const [ yearsData ] = useState(GetYearsArr(RELEASE_YEAR_START));
  const {filters, errors, handleChange, resetFilters, isFiltersNotEmpty} = useFilters(props.genres);

  useEffect(() => {
    if(filters && !errors) {
      const genresIds = filters.with_genres ? getGenresIdsByNames(filters.with_genres, props.genres) : [];
      props.onSubmit({...filters, with_genres: genresIds.length ? genresIds.join() : undefined});
    }
  }, [errors, filters, props])

  const handleResetForm = () => {
    resetFilters();
    setFormkey(Date.now());
  }

  const getSortKeyByValue = (value: string, sortByData: SortByDataType) => {
    const sortByDataItem = Object.values(sortByData).find((item) => item.value === value);
    return sortByDataItem?.key;
  }

  const handleYearChange = useCallback((value: string | null) => {
    handleChange(MoviesSearchKeys.PRIMARY_RELEASE_YEAR, (value && value !== '') ? value : undefined)
  },[handleChange]);

  const handleSortChange = useCallback((value: string | null) => {
    const sortKey = value ? getSortKeyByValue(value, SORT_BY_DATA) : SORT_BY_DEFAULT_KEY;
    handleChange(MoviesSearchKeys.SORT_BY, sortKey)
  }, [handleChange])

  const handleRatingFromChange = useCallback((value: string | number) => {
    handleChange(MoviesSearchKeys.VOTE_AVERAGE_GTE, value === '' ? undefined : value)
  }, [handleChange]);

  const handleRatingToChange = useCallback((value: string | number) => {
    handleChange(MoviesSearchKeys.VOTE_AVERAGE_LTE, value === '' ? undefined : value)
  }, [handleChange]);

  return (
    <form className={styles.filters} key={formkey}>
      <div className={styles.filtersTop}>
        <div className={styles.filtersItem}>
          <MultiSelect
            label="Genres"
            placeholder="Select genre"
            data={getGenresNamesArr(props.genres)}
            defaultValue={filters.with_genres}
            onChange={(value) => handleChange(MoviesSearchKeys.WITH_GENRES, value.length ? value : undefined)}
            withCheckIcon={false}
            classNames={MultiSelectClasses}
            rightSection={<IconChevronUp />}
            />
        </div>
        <div className={styles.filtersItem}>
          <StyledSelect
            label='Release year'
            placeholder='Select release year'
            data={yearsData}
            defaultValue={filters.primary_release_year ? filters.primary_release_year.toString() : undefined}
            onChange={handleYearChange} />
        </div>
        <div className={styles.ratings}>
          <div>
            <CustomInputNumber
              label='Ratings'
              placeholder='From'
              defaultValue={filters['vote_average.gte']}
              onChange={handleRatingFromChange}
              min={0}
              max={10}
              error={errors && errors['vote_average.gte'] || errors && errors.rating}/>
          </div>
          <div>
            <CustomInputNumber
              placeholder='To'
              onChange={handleRatingToChange}
              defaultValue={filters['vote_average.lte']}
              min={0}
              max={10}
              error={errors && errors['vote_average.lte'] || errors && errors.rating}
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
        <StyledSelect
          label='Sort by'
          placeholder='Select sort type'
          data={Object.values(SORT_BY_DATA).map((item) => item.value)}
          value={SORT_BY_DATA[filters.sort_by]?.value}
          onChange={handleSortChange} />
      </div>
    </form>
  );
};

export default memo(FiltersForm);
