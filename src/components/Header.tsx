import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const onSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <>
      {user ? (
        <span>
          {user.name} 님, 안녕하세요.
          <button onClick={onSignOut}>Sign out</button>
        </span>
      ) : (
        <nav>
          <Link to="/login">로그인</Link>
          &nbsp;|&nbsp;
          <Link to="/protected">페이지(로그인 필수 )</Link>
        </nav>
      )}
    </>
  );
};

export default Header;
