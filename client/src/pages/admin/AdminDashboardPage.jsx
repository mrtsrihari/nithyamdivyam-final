import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrderStats } from '../../api/services';
import { SkeletonText } from '../../components/SkeletonLoader';

const StatCard = ({ icon, label, value, color }) => (
  <div className="card p-6">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${color}`}>
      {icon}
    </div>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <p className="font-heading text-3xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderStats()
      .then((res) => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = (status) => {
    const map = { Pending: 'badge-pending', Processing: 'badge-processing', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };
    return <span className={map[status] || 'badge-pending'}>{status}</span>;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your orders.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="card p-6 animate-pulse">
              <div className="bg-gray-200 rounded-xl w-12 h-12 mb-4" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="📦" label="Total Orders" value={stats.total} color="bg-primary/10" />
          <StatCard icon="⏳" label="Pending" value={stats.pending} color="bg-amber-50" />
          <StatCard icon="🔄" label="Processing" value={stats.processing} color="bg-blue-50" />
          <StatCard icon="✅" label="Completed" value={stats.completed} color="bg-green-50" />
        </div>
      ) : null}

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-semibold text-gray-800">Recent Orders</h2>
          <Link to="/admin/orders" className="text-primary text-sm font-medium hover:underline">View All →</Link>
        </div>

        {loading ? (
          <SkeletonText lines={5} />
        ) : stats?.recent?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Customer</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Total</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recent.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium text-gray-800 text-sm">{order.customerName}</td>
                    <td className="py-3 text-gray-500 text-sm">{order.phone}</td>
                    <td className="py-3 font-bold text-primary text-sm">₹{order.totalPrice.toLocaleString()}</td>
                    <td className="py-3">{statusBadge(order.status)}</td>
                    <td className="py-3">
                      <Link to={`/admin/orders/${order._id}`} className="text-primary text-sm hover:underline font-medium">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-3">📦</div>
            <p>No orders yet. Orders will appear here once customers start placing them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
