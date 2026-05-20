import { Link } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-surface-light/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Package className="w-6 h-6 text-primary-light" />
          ShopFlow
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Products
          </Link>
          <Link to="/admin" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Admin
          </Link>
          <Link to="/cart" className="relative text-slate-400 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
