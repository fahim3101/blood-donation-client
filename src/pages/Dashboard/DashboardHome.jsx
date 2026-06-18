import useAuth from '../../hooks/useAuth';
import DonorHome from './DonorHome';
import AdminHome from './AdminHome';
import Spinner from '../../components/Spinner';

const DashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading || !user) return <Spinner />;

  // Admin and Volunteer share the same dashboard home layout
  if (user.role === 'admin' || user.role === 'volunteer') {
    return <AdminHome />;
  }

  return <DonorHome />;
};

export default DashboardHome;
