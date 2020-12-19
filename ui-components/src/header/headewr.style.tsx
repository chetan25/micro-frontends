import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  background: #d7232b75;
  min-height: 5rem;
`;

export const HeaderContent = styled.div`
    display: grid;
    padding: 26px 20px;
    grid-template-columns: 12fr 1fr;
    
    div:nth-child(1) {
      font-size: 26px;
      font-weight: bold
    }
    div:nth-child(2) {
      font-size: 16px;
      padding: 8px;
    }
`;
