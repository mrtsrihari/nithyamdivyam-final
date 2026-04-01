import { useState } from 'react';
import { trackOrder } from '../api/services';
import toast from 'react-hot-toast';
import { MagnifyingGlassIcon, CheckBadgeIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const OrderTrackingPage = () => {
  const [form, setForm] = useState({ orderId: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOrder(null);
    try {
      const res = await trackOrder(form);
      setOrder(res.data.data);
      toast.success('Order found!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order not found. Check details.');
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    Pending: { icon: CheckBadgeIcon, color: 'text-amber-500', step: 1 },
    Processing: { icon: TruckIcon, color: 'text-blue-500', step: 2 },
    Completed: { icon: CheckCircleIcon, color: 'text-green-500', step: 3 },
    Cancelled: { icon: XCircleIcon, color: 'text-red-500', step: 0 },
  };

  const getStatusLine = (currentStatus, targetStep) => {
    const activeStep = statusMap[currentStatus]?.step || 0;
    if (currentStatus === 'Cancelled') return 'bg-red-200';
    return activeStep >= targetStep ? 'bg-primary' : 'bg-gray-200';
  };

  return (
    <div className="min-h-screen bg-bg animate-fade-in pt-16 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <MagnifyingGlassIcon className="w-8 h-8" />
          </span>
          <h1 className="font-heading text-4xl font-bold text-gray-800 mb-3">Track Your Order</h1>
          <p className="text-gray-500">Enter your Order ID and phone number to see real-time status.</p>
        </div>

        <div className="card p-8 mb-10 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              required
              placeholder="Order ID (e.g. 64b8f...)"
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              className="input-field flex-1"
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-field flex-1"
            />
            <button type="submit" disabled={loading} className="btn-primary sm:w-auto w-full justify-center">
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>
        </div>

        {order && (
          <div className="card p-8 animate-slide-up">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-800">Order Status</h2>
                <p className="font-mono text-sm text-gray-400 mt-1">{order._id}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-primary/10 text-primary border-primary/20'}`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between relative mb-12 max-w-lg mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded break-words">
                <div 
                  className={`h-full transition-all duration-500 ${order.status === 'Cancelled' ? 'bg-red-400 w-full' : 'bg-primary'}`} 
                  style={{ width: order.status === 'Completed' ? '100%' : order.status === 'Processing' ? '50%' : '0%' }}
                />
              </div>

              {[
                { s: 'Pending', icon: CheckBadgeIcon, label: 'Order Placed' },
                { s: 'Processing', icon: TruckIcon, label: 'Packed & Ready' },
                { s: 'Completed', icon: CheckCircleIcon, label: 'Delivered' }
              ].map((step, idx) => {
                const isActive = (statusMap[order.status]?.step || 0) >= idx + 1;
                const Icon = step.icon;
                return (
                  <div key={step.s} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${isActive ? 'bg-primary text-white shadow-soft' : order.status === 'Cancelled' ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {order.status === 'Cancelled' && idx === 1 ? <XCircleIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <p className={`mt-3 text-sm font-semibold max-w-[80px] text-center ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {order.status === 'Cancelled' ? 'Cancelled' : step.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Order Summary</h3>
              {order.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-2 text-gray-600 whitespace-pre-wrap">
                  <span>{i.qty}x {i.name}</span>
                  <span>₹{(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200 text-gray-800">
                <span>Total Amount:</span>
                <span>₹{order.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
