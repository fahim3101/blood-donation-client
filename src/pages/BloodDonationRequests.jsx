import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaTint, FaCalendarAlt, FaClock } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { Pagination } from '../components/Shared';

const BloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests/pending`, { params: { page, limit } })
      .then((res) => {
        // Support both legacy array and new paginated {requests, count}
        if (Array.isArray(res.data)) {
          setRequests(res.data);
          setCount(res.data.length);
        } else {
          setRequests(res.data.requests || []);
          setCount(res.data.count || 0);
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="bg-gradient-to-br from-blush via-cream to-white min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-semibold text-gray-900">Open Donation Requests</h1>
          <p className="text-gray-600 mt-3">Someone nearby needs your help right now.</p>
        </div>

        {loading && <Spinner />}

        {!loading && requests.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-soft border border-blush max-w-xl mx-auto">
            <p className="text-5xl mb-4">🙏</p>
            <p className="text-gray-600 font-medium">No pending requests right now</p>
            <p className="text-sm text-gray-400 mt-1">Be the first to create a request and help will arrive.</p>
            <Link to="/dashboard/create-donation-request" className="inline-block mt-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-medium">Create Request</Link>
          </div>
        )}

        {!loading && requests.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((req) => (
                <div key={req._id} className="bg-white rounded-2xl shadow-soft border border-blush p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading text-lg font-semibold text-gray-800">{req.recipientName}</h3>
                    <span className="flex items-center gap-1 text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full text-sm">
                      <FaTint /> {req.bloodGroup}
                    </span>
                  </div>
                  <p className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FaMapMarkerAlt /> {req.recipientUpazila}, {req.recipientDistrict}
                  </p>
                  <p className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FaCalendarAlt /> {req.donationDate}
                  </p>
                  <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <FaClock /> {req.donationTime}
                  </p>
                  <Link
                    to={`/donation-requests/${req._id}`}
                    className="block text-center bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-full font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            <Pagination page={page} setPage={setPage} count={count} limit={limit} />
          </>
        )}
      </div>
    </div>
  );
};

export default BloodDonationRequests;
