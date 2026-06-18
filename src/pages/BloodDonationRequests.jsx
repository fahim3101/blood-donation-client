import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaTint, FaCalendarAlt, FaClock } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const BloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests/pending`)
      .then((res) => setRequests(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-br from-blush via-cream to-white min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-semibold text-gray-900">Open Donation Requests</h1>
          <p className="text-gray-600 mt-3">Someone nearby needs your help right now.</p>
        </div>

        {loading && <Spinner />}

        {!loading && requests.length === 0 && (
          <p className="text-center text-gray-400">No pending donation requests at the moment. 🙏</p>
        )}

        {!loading && requests.length > 0 && (
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
                  className="block text-center bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodDonationRequests;
