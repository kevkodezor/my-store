'use client';

import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { Product } from '@/types';
import { useCart } from '@/store/useCart';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';

const products: Product[] = [
  { id: '1', name: 'Café de Especialidad', price: 15, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500', category: 'Bebidas' },
  { id: '2', name: 'Taza de Cerámica', price: 12, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500', category: 'Hogar' },
  { id: '3', name: 'Prensa Francesa', price: 25, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=500', category: 'Equipos' },
  { id: '4', name: 'Té Matcha', price: 18, image: 'https://images.unsplash.com/photo-1582793988951-9aed550cbeaf?q=80&w=500', category: 'Bebidas' }
];

const categories = Array.from(new Set(products.map(p => p.category)));

export default function Home() {

  const { searchQuery, selectedCategories } = useCart();

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className='min-h-screen bg-[#F8F9FA]'>
      <Header />

      <main className='mx-auto px-4 pb-12'>
        <SearchBar categories={categories} />

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
