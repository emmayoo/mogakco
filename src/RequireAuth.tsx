import { Navigate, useLocation } from 'react-router-dom';
import useStore from './store';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user } = useStore();

  return (
    <>
      {user ? (
        children
      ) : (
        <Navigate
          to="/login"
          state={{ from: location, isProtected: true }}
          replace
        />
      )}
    </>
  );
};

export default RequireAuth;
