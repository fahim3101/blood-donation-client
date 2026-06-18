import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FaHandHoldingHeart, FaTimes } from 'react-icons/fa';
import axiosSecure from '../utils/axiosSecure';
import Spinner from '../components/Spinner';
import { Pagination } from '../components/Shared';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Funding = () => {
  const [fundings, setFundings] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const limit = 10;

  const fetchFundings = () => {
    setLoading(true);
    axiosSecure
      .get('/fundings', { params: { page, limit } })
      .then((res) => {
        setFundings(res.data.fundings);
        setCount(res.data.count);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFundings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="bg-gradient-to-br from-blush via-cream to-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="font-heading text-4xl font-semibold text-gray-900">Support Our Mission</h1>
            <p className="text-gray-600 mt-2">Every fund helps us run more donation drives and reach more lives.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium whitespace-nowrap transition-colors"
          >
            <FaHandHoldingHeart /> Give Fund
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full text-left">
              <thead className="bg-blush text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fundings.map((f) => (
                  <tr key={f._id}>
                    <td className="px-6 py-4">{f.name}</td>
                    <td className="px-6 py-4 text-primary-600 font-semibold">${f.amount}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(f.date).toLocaleDateString()}</td>
                  </tr>
                ))}
                {fundings.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-10 text-gray-400">No fundings yet. Be the first!</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination page={page} setPage={setPage} count={count} limit={limit} />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-soft max-w-md w-full p-8 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FaTimes />
            </button>
            <h3 className="font-heading text-xl font-semibold text-gray-900 mb-6">Give a Fund</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                onSuccess={() => {
                  setModalOpen(false);
                  fetchFundings();
                }}
                onClose={() => setModalOpen(false)}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
