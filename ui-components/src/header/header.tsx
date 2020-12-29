import React from 'react';
import { HeaderWrapper, HeaderContent } from './headewr.style';

export const Header = ({userName}: {userName: string}) => {
    return <HeaderWrapper>
        <HeaderContent>
            <div aria-label="Welcome User">Welcome {userName}</div>
        </HeaderContent>
    </HeaderWrapper>
}

export default Header;
