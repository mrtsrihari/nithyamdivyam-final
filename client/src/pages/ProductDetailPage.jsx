import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api/services';
import useCartStore from '../store/cartStore';
import { SkeletonText } from '../components/SkeletonLoader';
import toast from 'react-hot-toast';
import { ShoppingCartIcon, ArrowLeftIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetchProductById(id)
      .then((res) => setProduct(res.data.data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
        <div className="space-y-4 pt-4"><SkeletonText lines={6} /></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <div className="text-6xl mb-4">🌿</div>
        <h2 className="font-heading text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium mb-8 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-hover">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format'; }}
            />
          </div>

          {/* Info */}
          <div className="animate-slide-up">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium capitalize mb-4">{product.category}</span>
            <h1 className="font-heading text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-primary font-bold text-4xl">₹{product.price}</span>
              <span className="text-gray-400 text-lg">/ {product.unit}</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <MinusIcon className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-10 text-center font-bold text-gray-800 text-lg">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <span className="text-gray-500 text-sm">Total: <strong className="text-primary">₹{(product.price * qty).toLocaleString()}</strong></span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={handleAddToCart} disabled={!product.inStock} className="btn-primary text-base px-8 py-4 disabled:opacity-50">
                <ShoppingCartIcon className="w-5 h-5" /> Add to Cart
              </button>
              <Link to="/cart" className="btn-outline text-base px-8 py-4">
                View Cart
              </Link>
            </div>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['🌱 100% Organic', '🔬 Lab Tested', '🚚 Fast Delivery', '💚 No Additives'].map((b) => (
                <span key={b} className="bg-secondary/20 text-primary text-xs px-3 py-1 rounded-full font-medium">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
