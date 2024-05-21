import React, { memo, useCallback, useState } from 'react';
import { GenresList } from '../../types/types';
import { Button, MultiSelect, NumberInput, Select } from '@mantine/core';
import styles from './Filters.module.css';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { resetFilters, setGenres, setReleaseYear, setSortBy, setVoteAverageGte, setVoteAverageLte } from '../../store/filtersSlice';
import { getGenresIdsByNames, getGenresNamesArr, getGenresNamesByIds } from '../../utils/getGenres';

import MultiSelectClasses from './styles/MultiSelectClasses.module.css';
import SelectClasses from './styles/SelectClasses.module.css';
import NumberInputClasses from './styles/NumberInputClasses.module.css';
import textBtnClasses from '../../styles/textBtn.module.css';

import { IconChevronUp } from '@tabler/icons-react';
import { SORT_BY_DEFAULT, SortByData } from '../../constants/constants';
import { GetYearsArr } from '../../utils/getYearsArr';

function Filters(props: {genres: GenresList}) {
  const dispatch = useAppDispatch();
  const { withGenres, primaryReleaseYear, voteAverageLte, voteAverageGte, sortBy } = useAppSelector((state) => state.filters);
  const [formkey, setFormkey] = useState(Date.now());
  const [genresSelected, setGenresSelected] = useState<Array<string> | undefined>(
    withGenres?.length ? getGenresNamesByIds(withGenres, props.genres) : undefined);
  const [ yearsData ] = useState(GetYearsArr(1874));

  const isFiltersEmpty = () => {
    return !withGenres?.length && !primaryReleaseYear && !voteAverageLte && !voteAverageGte && sortBy === SORT_BY_DEFAULT;
  }

  const handleSelectGenresChange = (values: string[]) => {
    const genresIds = getGenresIdsByNames(values, props.genres);
    dispatch(setGenres(genresIds));
    setGenresSelected(values);
  };

  const handleRatingGteBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = Number(e.currentTarget.value);
    if(value < 0) {
      dispatch(setVoteAverageGte(0));
    } else if(value > 10) {
      dispatch(setVoteAverageGte(10));
    } else {
      dispatch(setVoteAverageGte(value));
    }
  }

  const handleRatingLteBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = Number(e.currentTarget.value);
    if(value < 0) {
      dispatch(setVoteAverageLte(0));
    } else if(value > 10) {
      dispatch(setVoteAverageLte(10));
    } else {
      dispatch(setVoteAverageLte(e.currentTarget.value));
    }
  }

  const handleSortByChange = (value: string | null) => {
    let sortByDataItem;
    if(value) {
      sortByDataItem = Object.values(SortByData).find((item) => item.value === value);
    }
    dispatch(setSortBy(sortByDataItem?.key || SORT_BY_DEFAULT));
  };

  const handleYearChange = (value: string | null) => {
    dispatch(setReleaseYear(value ? Number(value) : undefined));
  };

  const handleResetBtnClick = useCallback(() => {
    dispatch(resetFilters());
    setGenresSelected([]);
    setFormkey(Date.now());
  }, [dispatch]);

  return (
    <form className={styles.filters} key={formkey}>
      <div className={styles.filtersTop}>
        <div className={styles.filtersItem}>
          <MultiSelect
              label="Genres"
              placeholder="Select genre"
              data={getGenresNamesArr(props.genres)}
              onChange={handleSelectGenresChange}
              value={genresSelected}
              withCheckIcon={false}
              classNames={MultiSelectClasses}
              rightSection={<IconChevronUp />}
              />
        </div>
        <div className={styles.filtersItem}>
          <Select
            label='Release year'
            placeholder='Select release year'
            onChange={handleYearChange}
            data={yearsData}
            defaultValue={primaryReleaseYear ? primaryReleaseYear.toString() : undefined}
            withCheckIcon={false}
            classNames={SelectClasses}
            rightSection={<IconChevronUp />}
          />
        </div>
        <div className={styles.ratings}>
          <div>
            <NumberInput
              label='Ratings'
              placeholder='From'
              onBlur={handleRatingGteBlur}
              defaultValue={voteAverageGte}
              classNames={NumberInputClasses}
              min={0}
              max={10}
            />
          </div>
          <div>
            <NumberInput
              placeholder='To'
              onBlur={handleRatingLteBlur}
              defaultValue={voteAverageLte}
              classNames={NumberInputClasses}
              min={0}
              max={10}
            />
          </div>
        </div>
        <Button 
          variant="transparent" 
          className={styles.resetBtn} 
          classNames={textBtnClasses}
          disabled={isFiltersEmpty()}
          onClick={handleResetBtnClick}
          >Reset filters</Button>
      </div>
      <div className={styles.sort}>
        <Select
          label='Sort by'
          placeholder='Select sort type'
          onChange={handleSortByChange}
          data={Object.values(SortByData).map((item) => item.value)}
          value={sortBy ? SortByData[sortBy].value : undefined}
          withCheckIcon={false}
          classNames={SelectClasses}
          rightSection={<IconChevronUp />}
        />
      </div>
    </form>
  );
};

export default memo(Filters);
