import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';
import Home from './components/Home';
import RequireAuth from './RequireAuth';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<p>Page Not Found! (404)</p>} />
    </Routes>
  );
};

export default App;
