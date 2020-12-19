import React from 'react';
import { ButtonComponent, InverseButtonComponent, ButtonIconWrapper } from './button.style';

export interface ButtonProps {
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedby?: string;
  handleClick ?: <T>(T) => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {children, ariaLabel, ariaDescribedby, handleClick , disabled } = props;
  return <ButtonComponent disabled={ disabled } onClick={(d) => handleClick (d)} aria-label={ariaLabel} aria-describedby={ariaDescribedby}>{children}</ButtonComponent>
};

const InverseButton = (props: ButtonProps) => {
  const {children, ariaLabel, handleClick } = props;
  return <InverseButtonComponent aria-label={ariaLabel} onClick={handleClick }>{children}</InverseButtonComponent>
};

const IconButton = (props: ButtonProps) => {
  const {children, ariaLabel, ariaDescribedby, handleClick  } = props;

  return <ButtonIconWrapper onClick={handleClick} aria-label={ariaLabel} aria-describedby={ariaDescribedby}>{children}</ButtonIconWrapper>
}

export {
  Button,
  InverseButton,
  IconButton
};
