import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import useCartStore from '../store/cartStore';

const CartItem = ({ item }) => {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className="card p-4 flex items-center gap-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format'; }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-gray-800 truncate">{item.name}</h4>
        <p className="text-primary font-bold text-lg">₹{item.price} <span className="text-gray-400 text-sm font-normal">/ {item.unit}</span></p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(item._id, item.qty - 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <MinusIcon className="w-4 h-4 text-gray-600" />
        </button>
        <span className="w-8 text-center font-semibold text-gray-800">{item.qty}</span>
        <button
          onClick={() => updateQty(item._id, item.qty + 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <PlusIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="text-right min-w-[70px]">
        <p className="font-bold text-gray-800">₹{(item.price * item.qty).toLocaleString()}</p>
      </div>
      <button
        onClick={() => removeItem(item._id)}
        className="text-red-400 hover:text-red-600 transition-colors p-1"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;
