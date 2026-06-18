import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';
import AddressSelector from '../../components/AddressSelector';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosSecure.post('/donation-requests', form);
      toast.success('Donation request created successfully');
      navigate('/dashboard/my-donation-requests');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold text-gray-900 mb-6">Create Donation Request</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
            <input disabled value={user?.name || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
            <input disabled value={user?.email || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
          <input
            required
            value={form.recipientName}
            onChange={(e) => handleChange('recipientName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <AddressSelector
            district={form.recipientDistrict}
            upazila={form.recipientUpazila}
            onDistrictChange={(v) => handleChange('recipientDistrict', v)}
            onUpazilaChange={(v) => handleChange('recipientUpazila', v)}
            districtLabel="Recipient District"
            upazilaLabel="Recipient Upazila"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input
            required
            placeholder="e.g. Dhaka Medical College Hospital"
            value={form.hospitalName}
            onChange={(e) => handleChange('hospitalName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Address Line</label>
          <input
            required
            placeholder="e.g. Zahir Raihan Rd, Dhaka"
            value={form.fullAddress}
            onChange={(e) => handleChange('fullAddress', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            required
            value={form.bloodGroup}
            onChange={(e) => handleChange('bloodGroup', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
            <input
              type="date"
              required
              value={form.donationDate}
              onChange={(e) => handleChange('donationDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
            <input
              type="time"
              required
              value={form.donationTime}
              onChange={(e) => handleChange('donationTime', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Request Message</label>
          <textarea
            required
            rows="4"
            placeholder="Why do you need blood? Please share details."
            value={form.requestMessage}
            onChange={(e) => handleChange('requestMessage', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Request'}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
