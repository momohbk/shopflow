import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories, createCategory } from '../api';

function ProductForm({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category_id: product?.category_id || '',
    image: product?.image || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, form);
      } else {
        await createProduct(form);
      }
      onSave();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface-light rounded-2xl p-6 w-full max-w-lg border border-white/10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{product ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={e => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Category</label>
            <select
              value={form.category_id}
              onChange={e => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
            >
              <option value="">None</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Image URL</label>
            <input
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors cursor-pointer">
            {product ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

  const load = async () => {
    const [p, c] = await Promise.all([fetchProducts({ limit: 100 }), fetchCategories()]);
    setProducts(p.products);
    setCategories(c);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    load();
  };

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.slug) return;
    await createCategory(newCategory);
    setNewCategory({ name: '', slug: '' });
    setShowCategoryInput(false);
    const c = await fetchCategories();
    setCategories(c);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage products and categories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryInput(!showCategoryInput)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-light/50 border border-white/5 text-slate-300 hover:text-white transition-colors text-sm font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Category
          </button>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Product
          </button>
        </div>
      </div>

      {showCategoryInput && (
        <div className="flex gap-3 mb-6 p-4 bg-surface-light/30 rounded-2xl border border-white/5">
          <input
            value={newCategory.name}
            onChange={e => setNewCategory({ ...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            placeholder="Category name"
            className="flex-1 px-4 py-2 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
          />
          <input
            value={newCategory.slug}
            onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
            placeholder="slug"
            className="w-48 px-4 py-2 rounded-xl bg-surface/50 border border-white/5 text-white focus:outline-none focus:border-primary/50"
          />
          <button onClick={handleAddCategory} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
            Add
          </button>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editing}
          categories={categories}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={load}
        />
      )}

      <div className="bg-surface-light/20 rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Product</th>
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium hidden sm:table-cell">Category</th>
              <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium hidden md:table-cell">Stock</th>
              <th className="text-right px-6 py-4 text-slate-400 text-sm font-medium">Price</th>
              <th className="text-right px-6 py-4 text-slate-400 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-surface-light/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="text-white font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm hidden sm:table-cell">{p.category_name || '-'}</td>
                <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">{p.stock}</td>
                <td className="px-6 py-4 text-white font-medium text-right">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setEditing(p); setShowForm(true); }}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-light/50 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-surface-light/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
