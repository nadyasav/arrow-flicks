import React, { memo, useCallback, useState } from 'react';
import { GenresList } from '../../types/types';
import { Button, MultiSelect, NumberInput, Select } from '@mantine/core';
import styles from './Filters.module.css';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { resetFilters, setGenres, setSortBy, setVoteAverageGte, setVoteAverageLte } from '../../store/filtersSlice';
import { getGenresIdsByNames, getGenresNamesArr } from '../../utils/getGenres';

import MultiSelectClasses from './styles/MultiSelectClasses.module.css';
import { IconChevronUp } from '@tabler/icons-react';

const SortByValues = [
  'original_title.asc',
  'original_title.desc',
  'popularity.asc',
  'popularity.desc',
  'revenue.asc',
  'revenue.desc',
  'primary_release_date.asc',
  'title.desc',
  'primary_release_date.desc',
  'vote_average.asc',
  'vote_average.desc',
  'vote_count.asc',
  'vote_count.desc'
]

function Filters(props: {genres: GenresList}) {
  const dispatch = useAppDispatch();
  const { withGenres, primaryReleaseYear, voteAverageLte, voteAverageGte, sortBy } = useAppSelector((state) => state.filters);
  const [formkey, setFormkey] = useState(Date.now());
  const [genresSelected, setGenresSelected] = useState<Array<string>>([]);

  const isFiltersEmpty = () => {
    return !withGenres?.length && !primaryReleaseYear && !voteAverageLte && !voteAverageGte;
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
    dispatch(setSortBy(value));
  };

  const handleResetBtnClick = useCallback(() => {
    dispatch(resetFilters());
    setGenresSelected([]);
    setFormkey(Date.now());
  }, [dispatch]);

  return (
    <form className={styles.filters} key={formkey}>
      <div className={styles.filtersTop}>
        <div className={styles.genres}>
          <MultiSelect
              label="Genres"
              placeholder="Select genre"
              data={getGenresNamesArr(props.genres)}
              onChange={handleSelectGenresChange}
              value={genresSelected}
              withCheckIcon={false}
              classNames={{...MultiSelectClasses}}
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
              min={0}
              max={10}
            />
          </div>
          <div>
            <NumberInput
              placeholder='To'
              onBlur={handleRatingLteBlur}
              defaultValue={voteAverageLte}
              min={0}
              max={10}
            />
          </div>
        </div>
        <Button 
          variant="transparent" 
          className={styles.resetBtn} 
          disabled={isFiltersEmpty()}
          onClick={handleResetBtnClick}
          >Reset filters</Button>
      </div>
        <div className={styles.sort}>
          <Select
            label='Sort by'
            placeholder='Select sort type'
            onChange={handleSortByChange}
            data={SortByValues}
            defaultValue={sortBy}
          />
        </div>
    </form>
  );
};

export default memo(Filters);
