import React from 'react';
import { Select, SelectProps } from '@mantine/core';
import { IconChevronUp } from '@tabler/icons-react';
import SelectClasses from './SelectClasses.module.css';

export const StyledSelect = (props: SelectProps) => {
  return (
    <Select
      {...props}
      withCheckIcon={false}
      classNames={SelectClasses}
      rightSection={<IconChevronUp />}
    />
  );
};
