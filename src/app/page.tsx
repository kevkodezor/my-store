'use client';

import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { Product } from '@/types';
import { useCart } from '@/store/useCart';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';

const products: Product[] = [{
  id: '1',
  name: 'Empanada de Caraota',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}, {
  id: '2',
  name: 'Empanada de Carne',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}, {
  id: '3',
  name: 'Empanada de Pollo',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}, {
  id: '4',
  name: 'Empanada de Queso',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}];

export default function Home() {

  const searchQuery = useCart((state) => state.searchQuery);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-12">
        <SearchBar />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No encontramos lo que buscas 🔍
          </div>
        )}
      </main>

      <CartDrawer />
    </div>
  );
}
