import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderStyle = styled.div`
  width: 100%;
  height: auto;
  background-color: #f5e5eb;
  flex-grow: 0;
`;

const ContentStyle = styled.div`
  width: 100%;
  flex-grow: 1;
  background-color: #e6f7ee;
`;

const Layout = () => {
  return (
    <Wrapper>
      <HeaderStyle>
        <Header />
      </HeaderStyle>
      <ContentStyle>
        <Outlet />
      </ContentStyle>
    </Wrapper>
  );
};

export default Layout;
