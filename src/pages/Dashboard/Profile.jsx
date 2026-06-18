import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaSave } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../utils/axiosSecure';
import AddressSelector from '../../components/AddressSelector';
import { uploadImageToImgbb } from '../../utils/uploadImage';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
    bloodGroup: user?.bloodGroup || '',
    district: user?.district || '',
    upazila: user?.upazila || '',
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let avatarUrl = form.avatar;
      if (avatarFile) {
        avatarUrl = await uploadImageToImgbb(avatarFile);
      }
      await axiosSecure.patch(`/users/profile/${user.email}`, { ...form, avatar: avatarUrl });
      await refreshUser();
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl font-semibold text-gray-900">My Profile</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-4">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : form.avatar}
            alt={form.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary-200"
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="text-sm"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            disabled={!editing}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input disabled value={user?.email} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            disabled={!editing}
            value={form.bloodGroup}
            onChange={(e) => handleChange('bloodGroup', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 disabled:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {editing ? (
            <AddressSelector
              district={form.district}
              upazila={form.upazila}
              onDistrictChange={(v) => handleChange('district', v)}
              onUpazilaChange={(v) => handleChange('upazila', v)}
            />
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input disabled value={form.district} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
                <input disabled value={form.upazila} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5" />
              </div>
            </>
          )}
        </div>

        {editing && (
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-60"
          >
            <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
