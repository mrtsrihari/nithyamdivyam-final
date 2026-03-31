import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/services';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonLoader';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white text-center px-4">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-3">Shop</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Spice Collection</h1>
        <p className="text-white/70 max-w-lg mx-auto">Premium quality Black Pepper and Cardamom, straight from the farms of Kajanaparai</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-8 text-center">
            ⚠️ {error} — Make sure your backend server is running.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {loading
            ? [1, 2].map((n) => <SkeletonCard key={n} />)
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-6xl mb-4">🌿</div>
            <p className="text-lg">No products found. Please seed the database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
