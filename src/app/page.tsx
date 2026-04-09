'use client';

import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { Product } from '@/types';
import { useCart } from '@/store/useCart';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';

const products: Product[] = [{
  id: '1',
  name: 'Producto 1',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}, {
  id: '2',
  name: 'Producto 2',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}, {
  id: '3',
  name: 'Producto 3',
  price: 10,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  category: 'Category 1'
}, {
  id: '4',
  name: 'Producto 4',
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
    <div className='min-h-screen bg-[#F8F9FA]'>
      <Header />

      <main className='mx-auto px-4 pb-12'>
        <SearchBar />

        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className='text-center py-20 text-gray-400'>
            No encontramos lo que buscas 🔍
          </div>
        )}
      </main>

      <CartDrawer />
    </div>
  );
}
