'use client';

import Image from 'next/image';
import { ShoppingBagIcon } from 'lucide-react';
import { useCart } from '@/store/useCart';

export const Header = () => {
    const { setDrawer, getTotalItems } = useCart();
    const total = getTotalItems();

    return (
        <header className='m-2 p-4 rounded-md shadow bg-white flex justify-between items-center sticky top-0 z-40'>
            <div className='flex items-center gap-2'>
                <Image src='/logo.jpeg' alt='Logo' width={50} height={50} />
                <div className='font-bold text-xl tracking-tight'>Agunisex</div>
            </div>
            <button
                onClick={() => setDrawer(true)}
                className='relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-all active:scale-90 cursor-pointer'
                aria-label='Abrir carrito'
            >
                <ShoppingBagIcon size={24} strokeWidth={2} />
                {/* Badge de cantidad */}
                {total > 0 && (
                    <span className='absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm'>
                        {total}
                    </span>
                )}
            </button>
        </header>
    );
};