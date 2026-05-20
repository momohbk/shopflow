const API = '/api';

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category) query.set('category', params.category);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  const res = await fetch(`${API}/products?${query}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function createProduct(data) {
  const res = await fetch(`${API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${API}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API}/products/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(data) {
  const res = await fetch(`${API}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}
