import React from 'react';
import { InputElement } from './input.style';

export interface InputProp {
  type?: string;
  'aria-label'?: string;
  value?: string | number;
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = (props: InputProp) => {
  return (
    <InputElement {...props} />
  );
}

export default Input;
