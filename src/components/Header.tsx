'use client';

import Image from 'next/image';
import { ShoppingBagIcon } from 'lucide-react';
import { useCart } from '@/store/useCart';

export const Header = () => {
    const { setDrawer, getTotalItems } = useCart();
    const total = getTotalItems();

    return (
        <header className='m-2 p-4 rounded-md shadow bg-brand-primary flex justify-between items-center sticky top-0 z-40'>
            <Image src='/assets/logo-short.png' alt='Logo' width={100} height={100} loading='lazy' />

            <button
                onClick={() => setDrawer(true)}
                className='relative p-2.5 hover:bg-brand-accent-90 rounded-full transition-all active:scale-90 cursor-pointer'
                aria-label='Abrir carrito'
            >
                <ShoppingBagIcon size={24} strokeWidth={2} color='white' />
                {/* Badge de cantidad */}
                {total > 0 && (
                    <span className='absolute top-0 right-0 bg-brand-secondary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm'>
                        {total}
                    </span>
                )}
            </button>
        </header>
    );
};