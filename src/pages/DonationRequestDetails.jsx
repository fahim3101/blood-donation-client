import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaTint, FaCalendarAlt, FaClock, FaHospital, FaTimes } from 'react-icons/fa';
import axiosSecure from '../utils/axiosSecure';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import { StatusBadge } from '../components/Shared';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchRequest = () => {
    axiosSecure.get(`/donation-requests/${id}`).then((res) => setRequest(res.data));
  };

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirmDonate = async () => {
    setSubmitting(true);
    try {
      await axiosSecure.patch(`/donation-requests/${id}/status`, {
        status: 'inprogress',
        donorInfo: { name: user.name, email: user.email },
      });
      toast.success('Thank you! Your donation has been recorded.');
      setModalOpen(false);
      fetchRequest();
    } catch {
      toast.error('Something went wrong, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!request) return <p className="text-center py-20 text-gray-400">Request not found.</p>;

  return (
    <div className="bg-gradient-to-br from-blush via-cream to-white min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-soft p-8 sm:p-10">
          <div className="flex justify-between items-start mb-6">
            <h1 className="font-heading text-3xl font-semibold text-gray-900">{request.recipientName}</h1>
            <StatusBadge status={request.donationStatus} />
          </div>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-center gap-3"><FaTint className="text-primary-600" /> Blood Group: <strong>{request.bloodGroup}</strong></p>
            <p className="flex items-center gap-3"><FaHospital className="text-primary-600" /> {request.hospitalName}</p>
            <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-primary-600" /> {request.fullAddress}, {request.recipientUpazila}, {request.recipientDistrict}</p>
            <p className="flex items-center gap-3"><FaCalendarAlt className="text-primary-600" /> {request.donationDate}</p>
            <p className="flex items-center gap-3"><FaClock className="text-primary-600" /> {request.donationTime}</p>
          </div>

          <div className="mt-6 bg-blush rounded-xl p-5">
            <p className="font-medium text-gray-800 mb-1">Message from requester</p>
            <p className="text-gray-600 text-sm">{request.requestMessage}</p>
          </div>

          {request.donationStatus === 'inprogress' && request.donorInfo && (
            <div className="mt-4 bg-blue-50 rounded-xl p-5">
              <p className="font-medium text-gray-800 mb-1">Donor Information</p>
              <p className="text-gray-600 text-sm">{request.donorInfo.name} ({request.donorInfo.email})</p>
            </div>
          )}

          {request.donationStatus === 'pending' && (
            <button
              onClick={() => setModalOpen(true)}
              className="mt-8 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Donate Blood
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-soft max-w-md w-full p-8 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FaTimes />
            </button>
            <h3 className="font-heading text-xl font-semibold text-gray-900 mb-1">Confirm Your Donation</h3>
            <p className="text-gray-500 text-sm mb-6">You're about to commit to donating blood for this request.</p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
                <input readOnly value={user?.name || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donor Email</label>
                <input readOnly value={user?.email || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
              </div>
            </div>

            <button
              onClick={handleConfirmDonate}
              disabled={submitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-60"
            >
              {submitting ? 'Confirming...' : 'Confirm Donation'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
