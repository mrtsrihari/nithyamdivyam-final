import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderById, updateOrderStatus } from '../../api/services';
import { SkeletonText } from '../../components/SkeletonLoader';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const statusBadge = (status) => {
  const map = { Pending: 'badge-pending', Processing: 'badge-processing', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };
  return <span className={`${map[status] || 'badge-pending'} text-sm px-4 py-1.5`}>{status}</span>;
};

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrderById(id)
      .then((res) => setOrder(res.data.data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status) => {
    setUpdating(true);
    try {
      const res = await updateOrderStatus(id, status);
      setOrder(res.data.data);
      toast.success(`Status updated to ${status} ✅`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card p-8"><SkeletonText lines={10} /></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="font-heading text-xl font-bold text-gray-700 mb-4">Order not found</h2>
        <Link to="/admin/orders" className="btn-primary">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in print:max-w-none">
      <style>{`@media print { .print-hide { display: none !important; } }`}</style>
      
      <div className="flex items-center justify-between mb-6 print-hide">
        <Link to="/admin/orders" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Orders
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          🖨️ Print Invoice
        </button>
      </div>

      <div className="card p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-gray-800">Order Detail</h1>
            <p className="text-gray-400 text-xs mt-1 font-mono">{order._id}</p>
          </div>
          {statusBadge(order.status)}
        </div>

        {/* Customer info */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Customer Name', value: order.customerName },
            { label: 'Phone', value: order.phone },
            { label: 'Order Date', value: new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
              <p className="font-semibold text-gray-800 text-sm">{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Delivery Address</p>
          <p className="font-medium text-gray-700">{order.address}</p>
        </div>

        {order.notes && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">Customer Notes</p>
            <p className="text-gray-700 text-sm">{order.notes}</p>
          </div>
        )}

        {/* Items */}
        <h2 className="font-heading text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
        <div className="space-y-3 mb-8">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-400 text-sm">₹{item.price} × {item.qty}</p>
              </div>
              <p className="font-bold text-primary text-lg">₹{(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-primary/5 rounded-xl p-4 mb-8">
          <span className="font-bold text-gray-800 text-lg">Total Amount</span>
          <span className="font-bold text-primary text-2xl">₹{order.totalPrice.toLocaleString()}</span>
        </div>

        {/* Status update */}
        <div className="border-t border-gray-100 pt-6 print-hide">
          <h3 className="font-semibold text-gray-700 mb-4">Update Order Status</h3>
          <div className="flex flex-wrap gap-3">
            {['Pending', 'Processing', 'Completed', 'Cancelled'].map((s) => (
              <button
                key={s}
                disabled={updating || order.status === s}
                onClick={() => handleStatusChange(s)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
                  order.status === s
                    ? 'bg-primary text-white cursor-default'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
