import React from 'react';
import { NumberInput, NumberInputProps } from '@mantine/core';
import NumberInputClasses from './NumberInputClasses.module.css';
import { useDebouncedCallback } from '@mantine/hooks';

interface ICustomInputNumber extends NumberInputProps{
  onChange: (value: string | number) => void;
}

export const CustomInputNumber = (props: ICustomInputNumber) => {
  const { onChange } = props;

  const handleInputChange = useDebouncedCallback(async (value: string | number) => {
    onChange(value);
  }, 500);

  return (
    <NumberInput
      {...props}
      classNames={NumberInputClasses}
      onChange={handleInputChange}
    />
  );
};
