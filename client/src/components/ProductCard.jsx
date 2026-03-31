import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import useCartStore from '../store/cartStore';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const handleAdd = () => addItem(product, 1);

  return (
    <div className="card overflow-hidden group cursor-pointer">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format'; }}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-700 px-4 py-1 rounded-full text-sm font-medium">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="bg-primary text-white text-xs px-3 py-1 rounded-full capitalize">{product.category}</span>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-heading text-lg font-semibold text-gray-800 mb-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary font-bold text-xl">₹{product.price}</span>
            <span className="text-gray-400 text-sm ml-1">/ {product.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="btn-primary py-2 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
