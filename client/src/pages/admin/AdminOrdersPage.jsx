import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders, updateOrderStatus } from '../../api/services';
import { SkeletonText } from '../../components/SkeletonLoader';
import toast from 'react-hot-toast';

const statusBadge = (status) => {
  const map = { Pending: 'badge-pending', Processing: 'badge-processing', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };
  return <span className={map[status] || 'badge-pending'}>{status}</span>;
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [updating, setUpdating] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    fetchOrders()
      .then((res) => setOrders(res.data.data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
      toast.success(`Order marked as ${status} ✅`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);
  const filters = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-800">All Orders</h1>
          <p className="text-gray-500 mt-1">{orders.length} total orders</p>
        </div>
        <button onClick={loadOrders} className="btn-outline px-4 py-2 text-sm">🔄 Refresh</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-primary text-white shadow-soft' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}
          >
            {f}
            {f !== 'All' && <span className="ml-1 text-xs opacity-70">({orders.filter((o) => o.status === f).length})</span>}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-6"><SkeletonText lines={8} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📭</div>
            <p>No {filter !== 'All' ? filter.toLowerCase() : ''} orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Customer', 'Phone', 'Address', 'Items', 'Total', 'Date', 'Status', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-gray-800 text-sm whitespace-nowrap">{order.customerName}</td>
                    <td className="px-4 py-4 text-gray-500 text-sm whitespace-nowrap">{order.phone}</td>
                    <td className="px-4 py-4 text-gray-500 text-sm max-w-[150px] truncate">{order.address}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {order.items.map((i) => (
                        <div key={i.name} className="text-xs">{i.name} ×{i.qty}</div>
                      ))}
                    </td>
                    <td className="px-4 py-4 font-bold text-primary text-sm whitespace-nowrap">₹{order.totalPrice.toLocaleString()}</td>
                    <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-4">{statusBadge(order.status)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          disabled={updating === order._id}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50"
                        >
                          {['Pending', 'Processing', 'Completed', 'Cancelled'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <Link to={`/admin/orders/${order._id}`} className="text-primary hover:underline text-xs font-medium whitespace-nowrap">Detail</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
