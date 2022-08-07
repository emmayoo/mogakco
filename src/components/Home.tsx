import styled from 'styled-components';
import Calendar from './Calendar';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <Calendar />
    </Wrapper>
  );
};

export default Home;
