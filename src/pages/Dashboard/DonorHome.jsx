import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';
import DonationRequestsTable from '../../components/DonationRequestsTable';
import Spinner from '../../components/Spinner';

const DonorHome = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecent = () => {
    setLoading(true);
    axiosSecure
      .get('/donation-requests/recent')
      .then((res) => setRequests(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
        <h1 className="font-heading text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Thank you for being part of Lifeline. Every request you create or fulfill brings hope
          to someone in need.
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : requests.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-xl font-semibold text-gray-800">Your Recent Requests</h2>
            <Link to="/dashboard/my-donation-requests" className="text-primary-600 font-medium text-sm">
              View My All Requests →
            </Link>
          </div>
          <DonationRequestsTable requests={requests} onChanged={fetchRecent} mode="donor" />
        </>
      ) : null}
    </div>
  );
};

export default DonorHome;
