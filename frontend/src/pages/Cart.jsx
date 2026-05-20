import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-slate-400 mb-6">Start shopping to add items to your cart</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 bg-surface-light/30 rounded-2xl p-4 border border-white/5">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />

            <div className="flex-1 min-w-0">
              <Link to={`/products/${item.id}`} className="text-white font-medium hover:text-primary-light transition-colors">
                {item.name}
              </Link>
              <p className="text-primary-light font-semibold mt-1">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-3 bg-surface-lighter/50 rounded-lg px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right min-w-20">
              <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-surface-light/30 rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between text-lg">
          <span className="text-slate-400">Total ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span className="text-white font-bold text-2xl">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
