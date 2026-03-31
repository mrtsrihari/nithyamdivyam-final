import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import CartItem from '../components/CartItem';
import { ShoppingBagIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="font-heading text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Discover our premium organic spices and add them to your cart.</p>
        <Link to="/products" className="btn-primary">
          <ShoppingBagIcon className="w-5 h-5" /> Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-800">Your Cart</h1>
            <p className="text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={clearCart} className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors">
            Clear All
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => <CartItem key={item._id} item={item} />)}
        </div>

        {/* Summary */}
        <div className="card p-6">
          <h3 className="font-heading text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} × {item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-700 text-lg">Total</span>
            <span className="font-bold text-primary text-2xl">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/products" className="btn-outline w-full sm:w-auto justify-center">
              <ArrowLeftIcon className="w-4 h-4" /> Continue Shopping
            </Link>
            <Link to="/checkout" className="btn-primary w-full sm:w-auto justify-center flex-1">
              Proceed to Checkout <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
