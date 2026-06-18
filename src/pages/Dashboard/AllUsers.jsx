import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEllipsisV } from 'react-icons/fa';
import axiosSecure from '../../utils/axiosSecure';
import { Pagination } from '../../components/Shared';
import Spinner from '../../components/Spinner';

const filters = ['all', 'active', 'blocked'];

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const limit = 10;

  const fetchUsers = () => {
    setLoading(true);
    axiosSecure
      .get('/users', { params: { page, limit, status } })
      .then((res) => {
        setUsers(res.data.users);
        setCount(res.data.count);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
      toast.success(`User ${newStatus}`);
      fetchUsers();
    } catch {
      toast.error('Failed to update status');
    }
    setOpenMenu(null);
  };

  const updateRole = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role });
      toast.success(`Role updated to ${role}`);
      fetchUsers();
    } catch {
      toast.error('Failed to update role');
    }
    setOpenMenu(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-semibold text-gray-900">All Users</h1>
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
          <div className="bg-white rounded-2xl shadow-soft overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-blush text-gray-700 text-sm">
                <tr>
                  <th className="px-5 py-4">Avatar</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="px-5 py-4">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-800">{u.name}</td>
                    <td className="px-5 py-4 text-gray-500">{u.email}</td>
                    <td className="px-5 py-4 capitalize">{u.role}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === u._id ? null : u._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      >
                        <FaEllipsisV />
                      </button>
                      {openMenu === u._id && (
                        <div
                          onMouseLeave={() => setOpenMenu(null)}
                          className="absolute right-5 z-20 mt-1 w-44 bg-white rounded-xl shadow-soft border border-blush py-2"
                        >
                          {u.status === 'active' ? (
                            <button onClick={() => updateStatus(u._id, 'blocked')} className="w-full text-left px-4 py-2 hover:bg-blush text-sm">
                              Block User
                            </button>
                          ) : (
                            <button onClick={() => updateStatus(u._id, 'active')} className="w-full text-left px-4 py-2 hover:bg-blush text-sm">
                              Unblock User
                            </button>
                          )}
                          {u.role === 'donor' && (
                            <button onClick={() => updateRole(u._id, 'volunteer')} className="w-full text-left px-4 py-2 hover:bg-blush text-sm">
                              Make Volunteer
                            </button>
                          )}
                          {u.role !== 'admin' && (
                            <button onClick={() => updateRole(u._id, 'admin')} className="w-full text-left px-4 py-2 hover:bg-blush text-sm">
                              Make Admin
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination page={page} setPage={setPage} count={count} limit={limit} />
        </>
      )}
    </div>
  );
};

export default AllUsers;
