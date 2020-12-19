import React from 'react';
import { LabelElement } from './label.style';

interface LabelProp {
  children?: React.ReactNode;
  htmlFor?: string;
}

const Label = (props: LabelProp) => {
  const { children, htmlFor } = props;

  return (
    <LabelElement htmlFor={htmlFor}>{children}</LabelElement>
  );
}

export default Label;
