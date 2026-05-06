'use client';

import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import { useCart } from '@/store/useCart';
import { SearchBar } from '@/components/SearchBar';
import { getProducts } from '@/actions/products';
import { useState, useEffect } from 'react';

export default function Home() {

  const { searchQuery, selectedCategories } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.categoryId);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className='mx-5 mb-5'>
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
    </div>
  );
}
