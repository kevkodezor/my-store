'use client';

import Image from 'next/image';
import { CheckIcon } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { Product } from '@/types';

export const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart, cart } = useCart();
    const isAdded = cart.some(item => item.id === product.id)

    return (
        <div className='group flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white h-full'>
            <div className='relative w-full aspect-square overflow-hidden bg-gray-50'>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                    className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                />
            </div>
            <div className='p-5 flex flex-col grow'>
                <h3 className='font-medium text-gray-800 line-clamp-2 h-12 leading-6 mb-2'>
                    {product.name}
                </h3>
                <div className='mt-auto flex items-center justify-between mb-4'>
                    <p className='text-xl font-bold text-gray-900'>${product.basePrice}</p>
                </div>
                <button
                    onClick={() => !isAdded && addToCart(product)}
                    disabled={isAdded}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2
                        ${isAdded
                            ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                            : 'bg-black text-white hover:bg-gray-800 active:scale-95 cursor-pointer shadow-md hover:shadow-lg'
                        }`}
                >
                    {isAdded ? (
                        <>
                            <CheckIcon size={18} /> Agregado
                        </>
                    ) : (
                        'Agregar al carrito'
                    )}
                </button>
            </div>
        </div>
    );
};