import styled from 'styled-components';
import React from "react";

interface ButtonAttributes {
  type?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  onClick?: <T>(T) => void;
  disabled?: boolean;
}
// type StyledButton = Omit<
//   JSX.IntrinsicElements["button"],
//   "type" | "className"
//   > & {
//   type: "primary" | "secondary";
// };

export const ButtonComponent = styled.button<ButtonAttributes>`
  color: var(--primary-color, blue);
  background-color: var(--bg-color, #d7232b75);
  font-size: var(--btn-font-size, 18px);
  font-weight: var(--btn-font-weight, 700);
  // border: 2px solid var(--primary-color, blue);
  letter-spacing: 1px;
  // border-radius: 5px;
  padding: 10px 15px;
  border: none;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 1px solid var(--primary-color, blue);
    box-shadow: 2px 2px grey;
  }
  &:disabled  {
   background: grey;
  }
`;

ButtonComponent.defaultProps = {
  type: 'button'
}

export const InverseButtonComponent = styled(ButtonComponent)`
  background: var(--primary-inverse-color, #8181ca);
  color: var(--bg-color, #d7232b75);

  &:focus {
    outline: 1px solid var(--bg-color, #d7232b75);
  }
`;

export const ButtonIconWrapper = styled.button<ButtonAttributes>`
  background: transparent;
  font-size: var(--icon-btn-size, 1.5rem);
  border: none;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 1px solid var(--primary-color, blue);
    box-shadow: 2px 2px grey;
  }
`;
