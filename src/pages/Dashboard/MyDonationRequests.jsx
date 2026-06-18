import { useEffect, useState } from 'react';
import axiosSecure from '../../utils/axiosSecure';
import DonationRequestsTable from '../../components/DonationRequestsTable';
import { Pagination } from '../../components/Shared';
import Spinner from '../../components/Spinner';

const filters = ['all', 'pending', 'inprogress', 'done', 'canceled'];

const MyDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchData = () => {
    setLoading(true);
    axiosSecure
      .get('/donation-requests/mine', { params: { page, limit, status } })
      .then((res) => {
        setRequests(res.data.requests);
        setCount(res.data.count);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-semibold text-gray-900">My Donation Requests</h1>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(0);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          {filters.map((f) => (
            <option key={f} value={f}>{f === 'all' ? 'All Statuses' : f}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <DonationRequestsTable requests={requests} onChanged={fetchData} mode="donor" />
          <Pagination page={page} setPage={setPage} count={count} limit={limit} />
        </>
      )}
    </div>
  );
};

export default MyDonationRequests;
