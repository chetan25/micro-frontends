import React from 'react';
import styled,  { keyframes }  from 'styled-components';


const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

export const BannerWrapper = styled.div<{isOpen: boolean, backgroundColor: string}>`
    display: grid;
    grid-template-columns: 95% 5%;
    min-height: 1rem;
    background: ${({backgroundColor}) => backgroundColor};
    padding: 1rem;
    text-align: center;
    margin-top: 1rem;
    border-radius: 25px;

    visibility: ${({isOpen}) => !isOpen ? 'hidden' : 'visible'};
    animation: ${({isOpen}) => !isOpen ? fadeOut : fadeIn} 1s linear;
    transition: visibility 1s linear;
`;


export const BannerContent = styled.div<{color: string}>`
  color: ${({color}) => color};
`;


export const BannerCloseIcon = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0px;
  margin: 0;
  height: max-content;
  width: max-content;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 2px 3px;
  }
  &:focus,
  &:active {
     outline: 1px solid;
  }
`;
