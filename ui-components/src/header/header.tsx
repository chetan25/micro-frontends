import React from 'react';
import { HeaderWrapper, HeaderContent } from './headewr.style';

export const Header = () => {
    return <HeaderWrapper>
        <HeaderContent>
            <div aria-label="Welcome User">Welcome User</div>
        </HeaderContent>
    </HeaderWrapper>
}

export default Header;
