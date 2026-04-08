'use client';

import { Product } from '@/types';
import { useCart } from '@/store/useCart';
import { CheckIcon } from 'lucide-react';

export const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart, cart } = useCart();
    const isAdded = cart.some(item => item.id === product.id)

    return (
        <div className='border rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white'>
            <div className='aspect-square bg-gray-100 rounded-lg mb-3' /> {/* Placeholder Imagen */}
            <h3 className='font-semibold text-gray-800'>{product.name}</h3>
            <p className='text-blue-600 font-bold'>${product.price}</p>
            <button
                onClick={() => !isAdded && addToCart(product)}
                disabled={isAdded}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer
          ${isAdded
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-black text-white active:scale-95 hover:bg-gray-800'
                    }`}
            >
                {isAdded ? (
                    <>
                        <CheckIcon size={16} /> Agregado
                    </>
                ) : (
                    'Agregar al carrito'
                )}
            </button>
        </div>
    );
};