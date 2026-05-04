'use client';

import { useCart } from '@/store/useCart';

export const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useCart();

    return (
        <div className='flex items-center justify-center my-6 '>
            {/* Input de Búsqueda */}
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='¿Qué estás buscando hoy?'
                className='w-full lg:w-1/2 p-4 rounded-2xl border-none bg-white shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none'
            />
        </div>
    );
};