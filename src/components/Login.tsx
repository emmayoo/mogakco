import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../store';

interface ILocation {
  from: {
    pathname?: string;
  };
  isProtected?: boolean;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useStore();

  const state = location.state;
  let path = '/';
  let isProtected = false;
  if (state) {
    path = (state as ILocation).from?.pathname || '/';
    isProtected = (state as ILocation).isProtected || false;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;

    setUser(username);
    navigate(path, { replace: true });
  }

  return (
    <div>
      {isProtected && <h1>You must log in to view the page</h1>}

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
