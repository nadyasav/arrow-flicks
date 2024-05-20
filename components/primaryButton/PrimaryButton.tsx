import { Button, ButtonProps } from '@mantine/core';
import classes from './PrimaryButton.module.css';

type PrimaryButton = Omit<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps, ''> & {
  children: React.ReactNode;
  onClick: () => void;
}

export const PrimaryButton = (props: PrimaryButton) => {
  const { children, onClick, ...btnProps } = props;
  return (
    <Button
      onSubmit={onClick}
      onClick={onClick}
      classNames={classes}
      {...btnProps}
    >
      {children}
    </Button>
  );
};
