import { useEffect, useState } from 'react';
import axios from 'axios';

// Reusable pair of <select> inputs for district + upazila.
// Usage: <AddressSelector district={district} upazila={upazila} onDistrictChange={...} onUpazilaChange={...} />
const AddressSelector = ({ district, upazila, onDistrictChange, onUpazilaChange, districtLabel = 'District', upazilaLabel = 'Upazila' }) => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/districts`).then((res) => setDistricts(res.data));
  }, []);

  useEffect(() => {
    if (district) {
      axios.get(`${import.meta.env.VITE_API_URL}/upazilas/${district}`).then((res) => setUpazilas(res.data));
    } else {
      setUpazilas([]);
    }
  }, [district]);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{districtLabel}</label>
        <select
          required
          value={district}
          onChange={(e) => {
            onDistrictChange(e.target.value);
            onUpazilaChange('');
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{upazilaLabel}</label>
        <select
          required
          value={upazila}
          onChange={(e) => onUpazilaChange(e.target.value)}
          disabled={!district}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:bg-gray-100"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default AddressSelector;
