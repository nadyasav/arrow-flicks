import React from 'react';
import { GenresList } from '../../types/types';
import { MultiSelect } from '@mantine/core';
import styles from './Filters.module.css';

export const Filters = (props: {genres: GenresList}) => {
  const handleSelectGenresChange = (values: string[]) => {
    console.log(values);
  };

  return (
    <div className={styles.select}>
        <div className={styles.genres}>
            <MultiSelect
                label="Genres"
                placeholder="Select genre"
                data={getGenresNamesArr(props.genres)}
                onChange={handleSelectGenresChange}
                />
        </div>
    </div>
  );
};

const getGenresNamesArr = (genres: GenresList) => {
  return genres.map((item) => item.name);
};
