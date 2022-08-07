import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useStore from '../store';

const Wrapper = styled.div`
  padding: 20px 10px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Hamburger = styled.div`
  label {
    display: block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    &:hover circle {
      opacity: 1;
    }
  }

  circle {
    fill: #fff3;
    opacity: 0;
  }

  path {
    fill: none;
    stroke: #000;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    --length: 24;
    --offset: -38;
    stroke-dasharray: var(--length) var(--total-length);
    stroke-dashoffset: var(--offset);
    transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .line--1,
  .line--3 {
    --total-length: 126.64183044433594;
  }
  .line--2 {
    --total-length: 70;
  }

  input:checked + svg {
    .line--1 {
      --length: 22.627416998;
    }
  }

  input:checked + svg {
    .line--1,
    .line--3 {
      --offset: -94.1149185097;
    }
    .line--2 {
      --offset: -50;
    }
  }
`;

const Button = styled.button`
  all: unset;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const onSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Wrapper>
      <Hamburger>
        <label>
          <input type="checkbox" style={{ display: 'none' }} />
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" />
            <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
            <path className="line--2" d="M0 50h70" />
            <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
          </svg>
        </label>
      </Hamburger>
      <div>
        {user ? (
          <>
            Hi, {user.name}! <Button onClick={onSignOut}>Sign out</Button>
          </>
        ) : (
          <Button>
            <Link to="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
