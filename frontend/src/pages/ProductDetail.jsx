import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react';
import { fetchProduct } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-slate-500">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-slate-500">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-surface-light/30">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
        </div>

        <div>
          <span className="text-sm text-primary-light font-medium">{product.category_name}</span>
          <h1 className="text-3xl font-bold text-white mt-2">{product.name}</h1>
          <p className="text-slate-400 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
            <span className="text-slate-500 text-sm">{product.stock} units available</span>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-3 bg-surface-light/50 rounded-xl px-3 py-2">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-medium w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
