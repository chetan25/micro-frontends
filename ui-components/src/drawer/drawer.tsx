import React from 'react';
import { DrawerWrapper, Backdrop, DrawerAside } from './drawer.style';
import { useTabTrapHook } from '../utils/TabTrapHook';

interface DrawerProps {
  children: React.ReactNode;
  onClose?: () => void;
  opened: boolean;
  slide?: 'left' | 'right';
  firstFocusNodeIndex?: number;
}

const Drawer = (props: DrawerProps) => {
  const { children, onClose, opened = false, slide = 'left', firstFocusNodeIndex = 1 } = props;
  const { trapTabKey }  = useTabTrapHook('drawer', firstFocusNodeIndex);

  const onKeyPress = (e: React.KeyboardEvent) => {
    // Add custom close event for Escape
    if (e.keyCode === 27) {
      onClose();
    }
    trapTabKey(e);
  }

  return (
    <DrawerWrapper id='drawer' onKeyDown={onKeyPress}>
      <Backdrop onClick={onClose} opened={opened} />
      <DrawerAside opened={opened} slide={slide}>
        {children}
      </DrawerAside>
    </DrawerWrapper>
  );
}

export default Drawer;
