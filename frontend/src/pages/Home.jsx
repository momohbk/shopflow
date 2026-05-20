import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ search, category: category || undefined, page, limit: 12 })
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Product <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Catalog</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Browse our collection of premium products
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-light/50 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </form>

        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setPage(1); }}
          className="px-4 py-3 rounded-xl bg-surface-light/50 border border-white/5 text-white focus:outline-none focus:border-primary/50 transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'bg-surface-light/50 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
