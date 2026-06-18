import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from './Spinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // IMPORTANT: while auth state is still being resolved on page reload,
  // we show a spinner instead of redirecting - this prevents logged-in
  // users from being bounced to /login when they refresh a private route.
  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
