import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { placeOrder } from '../api/services';
import toast from 'react-hot-toast';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const total = totalPrice();
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleWhatsApp = () => {
    const lines = items.map((i) => `• ${i.name} × ${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const msg = encodeURIComponent(
      `🌿 *Nithyam Divyam Spices - New Order*\n\n${lines}\n\n*Total: ₹${total}*\n\nName: ${form.customerName || 'Not provided'}\nPhone: ${form.phone || 'Not provided'}\nAddress: ${form.address || 'Not provided'}`
    );
    window.open(`https://wa.me/917306807443?text=${msg}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.address) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({ productId: i._id, name: i.name, price: i.price, qty: i.qty }));
      await placeOrder({ ...form, items: orderItems, totalPrice: total });
      setSuccess(true);
      clearCart();
      toast.success('Order placed successfully! 🎉');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4 animate-fade-in print:bg-white print:items-start print:pt-10">
        <div className="card p-12 max-w-md w-full text-center print:shadow-none print:border-none print:max-w-none">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 print-hide">
            <CheckCircleIcon className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-3">Order Placed! 🎉</h2>
          <p className="text-gray-500 mb-8 print-hide">Thank you for your order. We'll contact you shortly at <strong>{form.phone}</strong> to confirm delivery.</p>
          
          <div className="hidden print:block text-left mb-10 border-t border-b border-gray-200 py-6">
            <h3 className="font-bold text-lg mb-2">Order Receipt</h3>
            <p className="text-gray-600 mb-1"><strong>Name:</strong> {form.customerName}</p>
            <p className="text-gray-600 mb-1"><strong>Phone:</strong> {form.phone}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {form.address}</p>
            {items.map((i) => (
              <div key={i._id} className="flex justify-between border-b border-gray-100 py-2">
                <span>{i.name} × {i.qty}</span>
                <span>₹{(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-xl mt-4">
              <span>Total Paid/Due:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 print-hide">
            <button onClick={() => window.print()} className="btn-accent justify-center">🖨️ Print Receipt</button>
            <button onClick={() => navigate('/products')} className="btn-primary justify-center">Continue Shopping</button>
            <button onClick={() => { navigate('/'); }} className="btn-outline justify-center">Go Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
        <p className="text-gray-500 mb-10">Complete your order — via WhatsApp or direct form submission.</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <div className="card p-6 mb-6">
              <h2 className="font-heading text-xl font-semibold text-gray-800 mb-5">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Enter your full name" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                  <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Door no, Street, City, Pincode" className="input-field resize-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Any special instructions..." className="input-field resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 disabled:opacity-60">
                  {loading ? 'Placing Order...' : '📦 Place Order'}
                </button>
              </form>
            </div>

            {/* WhatsApp Option */}
            <div className="card p-6 border-2 border-green-200 bg-green-50">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Order via WhatsApp</h3>
                  <p className="text-sm text-gray-500">Instant confirmation & personal service</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Click below to send your order directly to our WhatsApp. Our team will respond within minutes!</p>
              <button onClick={handleWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200">
                <span>📱</span> Send Order on WhatsApp
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-gray-800 mb-5">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&auto=format'; }} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      <p className="text-gray-400 text-xs">₹{item.price} × {item.qty}</p>
                    </div>
                    <span className="font-semibold text-gray-700">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-green-600 font-medium text-sm">Contact us</span>
                </div>
                <div className="flex justify-between items-center bg-primary/5 rounded-xl p-3">
                  <span className="font-bold text-gray-800 text-lg">Total</span>
                  <span className="font-bold text-primary text-2xl">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
