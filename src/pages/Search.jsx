import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSearch, FaTint, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import AddressSelector from '../components/AddressSelector';
import Spinner from '../components/Spinner';
import axiosSecure from '../utils/axiosSecure';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Search = () => {
  const [filters, setFilters] = useState({ bloodGroup: '', district: '', upazila: '' });
  const [donors, setDonors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.district) params.district = filters.district;
      if (filters.upazila) params.upazila = filters.upazila;

      const { data } = await axiosSecure.get('/search-donors', { params });
      setDonors(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to search donors. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blush via-cream to-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-semibold text-gray-900">Search Donors</h1>
          <p className="text-gray-600 mt-3">
            Find a willing blood donor near you, filtered by blood group and location.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <select
              value={filters.bloodGroup}
              onChange={(e) => setFilters((p) => ({ ...p, bloodGroup: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="">Any</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <AddressSelector
            district={filters.district}
            upazila={filters.upazila}
            onDistrictChange={(v) => setFilters((p) => ({ ...p, district: v }))}
            onUpazilaChange={(v) => setFilters((p) => ({ ...p, upazila: v }))}
          />

          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FaSearch /> Search
          </button>
        </form>

        <div className="mt-10">
          {loading && <Spinner />}

          {!loading && donors === null && (
            <p className="text-center text-gray-400">Use the filters above to find donors.</p>
          )}

          {!loading && donors && donors.length === 0 && (
            <p className="text-center text-gray-400">No donors found matching your criteria.</p>
          )}

          {!loading && donors && donors.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <div key={donor._id} className="bg-white rounded-2xl shadow-soft border border-blush p-6 text-center">
                  <img
                    src={donor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(donor.name)}&background=FFE9E4&color=DC2828&size=80`}
                    alt={donor.name}
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(donor.name)}&background=FFE9E4&color=DC2828&size=80`; }}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary-200"
                  />
                  <h3 className="font-heading text-lg font-semibold text-gray-800">{donor.name}</h3>
                  <p className="flex items-center justify-center gap-2 text-primary-600 font-semibold mt-1">
                    <FaTint /> {donor.bloodGroup}
                  </p>
                  <p className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-2">
                    <FaMapMarkerAlt /> {donor.upazila}, {donor.district}
                  </p>
                  <p className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-1">
                    <FaEnvelope /> {donor.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
