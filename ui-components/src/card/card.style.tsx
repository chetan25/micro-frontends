import styled, { css } from 'styled-components';
import React from 'react';

interface CardWrapperProps {
    role?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  height: var(--card-height, 300px);
  width: var(--card-width, 70%);
  background-color: var(--card-bg-color, grey);
 `;

CardWrapper.defaultProps = {
  role: 'Card Content'
}

interface TitleProps {
  cardTitle?: React.ReactNode;
  id?: string;
}

interface BodyProps {
  children?: React.ReactNode;
  id?: string;
}

interface FooterProps {
  children?: React.ReactNode;
  id?: string;
}

const commonStyles = `
   border-bottom: 2px solid red;
   text-align: center;
`;

export const CardTitle = styled.div<TitleProps>`
  min-height: var(--card-title-min-height, 15%);
  ${props => props.cardTitle ? css`${commonStyles}` : '' }
`;

export const CardBody = styled.div<BodyProps>`
  min-height: var(--card-body-min-height, 45%);
  margin: 2rem;
  text-align: center;
`;

export const CardFooter = styled.div<FooterProps>`
  min-height: var(--card-footer-min-height, 20%);
  text-align: center;
  border-top: ${props => props.children ? '2px solid red' : ''}
`;
