import styled, { css } from 'styled-components';
import React from 'react';

export const DrawerWrapper = styled.div`
   display: block;

   & ([opened]) aside {
      visibility: visible;
      top: 0;
      left: -100%;
   }
`;

const drawerBackdropOpen = css`
  opacity: 1;
  pointer-events: all;
`;

interface BackdropProps {
  opened: boolean;
  onClick?: () => void;
}

export const Backdrop = styled.div<BackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.75);
  opacity: 0;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.3s ease-out;
   ${props => props.opened && drawerBackdropOpen}
`;

const drawerAsideOpenLeft = css`
  visibility: visible;
  top: 0;
  left: 0;
`;

const drawerAsideOpenRight = css`
  visibility: visible;
  top: 0;
  right: 0;
`;

const drawerSlideLeft = css`
  top: 0;
  left: -100%;
`;

const drawerSlideRight = css`
  top: 0;
  right: -100%;
`;

interface AsideProps {
  opened: boolean;
  slide?: 'left' | 'right';
  children?: React.ReactNode;
}

export const  DrawerAside = styled.aside<AsideProps>`
  position: fixed;
  width: var(--drawer-width , 30rem);
  max-width: 80%;
  height: 100vh;
  background: var(--drawer-background, #faf7f7);
  box-shadow: 0 2px 8px rgba(0,0,0,0.26);
  transition: all 0.3s ease-out;
  z-index: var(--drawer-zIndex, 20);
  ${props => props.slide  === 'right' ? drawerSlideRight : drawerSlideLeft }
  ${props => props.opened && props.slide  === 'left' && drawerAsideOpenLeft}
  ${props => props.opened && props.slide  === 'right' && drawerAsideOpenRight}
`;
