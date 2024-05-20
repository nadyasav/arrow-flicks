import React, { useState } from 'react';
import styles from './SearchField.module.scss';
import { PrimaryButton } from '../primaryButton/PrimaryButton';

interface ISearchField {
  value?: string;
  onSearch: (value: string) => void;
}

export const SearchField = (props: ISearchField) => {
  const [searchValue, setSearchValue] = useState<string>(
    props.value ? props.value : ''
  );

  const handleSearch = () => {
    props.onSearch(searchValue.trim());
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.searchInputBox}>
      <input
        type='search'
        placeholder="Search movie title"
        value={searchValue}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <span className={styles.searchBtnBox}>
        <PrimaryButton
          type="button"
          onClick={handleSearch}
          className={styles.searchBtn}
        >
          Search
        </PrimaryButton>
      </span>
    </div>
  );
};
