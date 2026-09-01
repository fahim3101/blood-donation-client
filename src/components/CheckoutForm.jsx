import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import axiosSecure from '../utils/axiosSecure';
import useAuth from '../hooks/useAuth';

const CheckoutForm = ({ onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [amount, setAmount] = useState(5);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (amount < 1) return toast.error('Amount must be at least $1');
    if (amount > 500) return toast.error('Maximum funding is $500');

    setProcessing(true);
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', { amount });
      const card = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card, billing_details: { name: user?.name, email: user?.email } },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await axiosSecure.post('/fundings', { name: user.name, email: user.email, amount });
        toast.success('Thank you for your generous funding!');
        onSuccess();
      }
    } catch {
      toast.error('Payment failed, please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="fund-amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
        <input
          id="fund-amount"
          type="number"
          min="1"
          max="500"
          required
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <p className="text-xs text-gray-400 mt-1">Min $1 — Max $500</p>
      </div>

      <div className="border border-gray-300 rounded-lg px-4 py-3">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-full font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-full font-medium disabled:opacity-60"
        >
          {processing ? 'Processing...' : `Give $${amount}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
