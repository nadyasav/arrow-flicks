import React, { memo } from 'react';
import classes from './CustomPagination.module.scss';
import { Pagination, PaginationProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

interface ICustomPagination extends PaginationProps{
  value: number;
  total: number;
  onChange: (value: number) => void;
  timeOut?: number;
}

function CustomPagination(props: ICustomPagination) {
  const { value, total, onChange, timeOut=0 } = props;

  const handlePageOnChange = useDebouncedCallback((value: number) => {
    onChange(value);
  }, timeOut);

  const getPageBtnState = (pageBtn: number) => {
    const currentPage = value;
    const leftPageBtn = pageBtn < currentPage - 1 && currentPage >= 3 && pageBtn < total - 2;
    const rightPageBtn = pageBtn > currentPage + 1 && pageBtn > 3;
    const conditions = leftPageBtn || rightPageBtn;

    if(conditions){
      return { display: 'none' }
    }
    return {};
  }

  return (
    <Pagination
      getItemProps={getPageBtnState}
      classNames={classes}
      {...props}
      onChange={handlePageOnChange}
      />
  );
};

export default memo(CustomPagination);
