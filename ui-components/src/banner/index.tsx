import React, { useState, useEffect } from 'react';
import  { BannerWrapper, BannerContent, BannerCloseIcon } from './banner.style';
import CloseIcon  from '../icons/close-icon';

type BannerTypes = 'error' | 'success';

let isComponentMounted = false;
const BannerStyles: Record<BannerTypes, {
  color: string;
  backgroundColor: string;
}> = {
  'error': {
    color: '#780909',
    backgroundColor: '#ec4f4f'
  },
  'success': {
    color: '#0e7123',
    backgroundColor: '#72da72'
  }
};

interface BannerProps {
  children: React.ReactNode | React.ReactNode[];
  autoClose?: boolean;
  type: BannerTypes;
  onClose?: () => Promise<any>;
}

const Banner = ({ children, type, onClose, autoClose = false }: BannerProps) => {
  const [isOpen, setIsOpen] = useState(true);
  let timer = null;

  useEffect(() => {
    isComponentMounted = true;
  }, []);

  useEffect(() => {
      if (autoClose && !timer) {
        timer = setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }

      return () => {
        isComponentMounted = false;
        clearTimeout(timer);
      };
  });

  const closeBanner = () => {
    if (!onClose) {
      setIsOpen(false);
      return;
    }
    onClose().then(success => {
      if (isComponentMounted) {
        setIsOpen(false);
      }
      clearTimeout(timer);
    });
  };

  return (
    <BannerWrapper isOpen={isOpen} backgroundColor={BannerStyles[type].backgroundColor}>
      <BannerContent color={BannerStyles[type].color}>{children}</BannerContent>
      <BannerCloseIcon onClick={closeBanner}><CloseIcon fill={BannerStyles[type].color}/></BannerCloseIcon>
    </BannerWrapper>
  );
};

export default Banner;
