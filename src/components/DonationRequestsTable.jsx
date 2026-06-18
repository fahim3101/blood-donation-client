import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axiosSecure from '../utils/axiosSecure';
import { StatusBadge } from './Shared';

// mode: 'donor' (owner full control), 'admin' (full control on any request), 'volunteer' (status-only)
const DonationRequestsTable = ({ requests, onChanged, mode }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this request?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2828',
      confirmButtonText: 'Yes, delete it',
    });
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      toast.success('Request deleted');
      onChanged();
    } catch {
      toast.error('Failed to delete request');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}/status`, { status });
      toast.success('Status updated');
      onChanged();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-x-auto">
      <table className="w-full text-left min-w-[800px]">
        <thead className="bg-blush text-gray-700 text-sm">
          <tr>
            <th className="px-5 py-4">Recipient</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Date</th>
            <th className="px-5 py-4">Time</th>
            <th className="px-5 py-4">Blood</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Donor Info</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="px-5 py-4 font-medium text-gray-800">{req.recipientName}</td>
              <td className="px-5 py-4 text-gray-500">{req.recipientUpazila}, {req.recipientDistrict}</td>
              <td className="px-5 py-4 text-gray-500">{req.donationDate}</td>
              <td className="px-5 py-4 text-gray-500">{req.donationTime}</td>
              <td className="px-5 py-4 font-semibold text-primary-600">{req.bloodGroup}</td>
              <td className="px-5 py-4">
                {mode === 'volunteer' ? (
                  <select
                    value={req.donationStatus}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="pending">pending</option>
                    <option value="inprogress">inprogress</option>
                    <option value="done">done</option>
                    <option value="canceled">canceled</option>
                  </select>
                ) : (
                  <StatusBadge status={req.donationStatus} />
                )}
              </td>
              <td className="px-5 py-4 text-gray-500">
                {req.donationStatus === 'inprogress' && req.donorInfo
                  ? `${req.donorInfo.name}`
                  : '-'}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/donation-requests/${req._id}`)}
                    title="View"
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
                  >
                    <FaEye />
                  </button>

                  {mode !== 'volunteer' && req.donationStatus === 'inprogress' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, 'done')}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-semibold"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, 'canceled')}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {mode !== 'volunteer' && (
                    <>
                      <button
                        onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                        title="Edit"
                        className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        title="Delete"
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-primary-600"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-10 text-gray-400">No donation requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationRequestsTable;
