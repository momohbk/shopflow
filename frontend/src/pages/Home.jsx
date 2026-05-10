export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ShopFlow</h1>
          <nav className="flex gap-6">
            <a href="/products" className="text-gray-600 hover:text-indigo-600">Products</a>
            <a href="/cart" className="text-gray-600 hover:text-indigo-600">Cart</a>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Headless E-Commerce</h2>
        <p className="text-xl text-gray-600 mb-8">Built with React & Laravel</p>
        <a href="/products" className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
          Browse Products
        </a>
      </main>
    </div>
  )
}
