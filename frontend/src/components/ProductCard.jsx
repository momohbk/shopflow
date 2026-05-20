import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group rounded-2xl bg-surface-light/50 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs text-primary-light font-medium">{product.category_name}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-white font-semibold mt-1 group-hover:text-primary-light transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          <span className="text-xs text-slate-500">{product.stock} in stock</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
