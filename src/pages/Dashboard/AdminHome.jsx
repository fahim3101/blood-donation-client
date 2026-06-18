import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUsers, FaHandHoldingHeart, FaTint } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';
import Spinner from '../../components/Spinner';

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-soft p-6 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-heading font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

const AdminHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axiosSecure.get('/admin-stats'),
      axiosSecure.get('/donation-requests-chart'),
    ])
      .then(([statsRes, chartRes]) => {
        setStats(statsRes.data);
        setChartData(chartRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
        <h1 className="font-heading text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-2 capitalize">Logged in as {user?.role}. Here's what's happening on Lifeline today.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<FaUsers />} title="Total Donors" value={stats?.totalUsers ?? 0} color="bg-blush text-primary-600" />
        <StatCard icon={<FaHandHoldingHeart />} title="Total Funding" value={`$${stats?.totalFunding ?? 0}`} color="bg-green-50 text-green-600" />
        <StatCard icon={<FaTint />} title="Total Donation Requests" value={stats?.totalRequests ?? 0} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
        <h2 className="font-heading text-xl font-semibold text-gray-800 mb-6">Donation Requests Over Time</h2>
        {chartData.length === 0 ? (
          <p className="text-gray-400 text-center py-10">Not enough data yet to show a chart.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2828" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#DC2828" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFE1E1" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#DC2828" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
