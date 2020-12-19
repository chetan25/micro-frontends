import React from "react";
import { SpinnerOverlay, SpinnerContainer } from './spinner.style';

interface SpinnerProps {
  className?: string;
}
const Spinner = ({className}: SpinnerProps) => {
    return (
        <SpinnerOverlay data-testid="spinner"  className={className}>
            <SpinnerContainer />
        </SpinnerOverlay>
    );
}

export default Spinner;

