'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/store/useCart';
import { CheckIcon, FilterIcon, ShoppingBagIcon, XIcon } from 'lucide-react';
import { PiWhatsappLogo, PiInstagramLogoLight, PiTiktokLogoLight } from 'react-icons/pi';
import Link from 'next/link';
import { Category } from '@/types/category';

export const Header = ({ categories }: { categories: Category[] }) => {
    const { setDrawer, getTotalItems, selectedCategories, toggleCategory } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const total = getTotalItems();

    return (
        <header className='m-2 p-4 rounded-md shadow bg-brand-primary flex justify-between items-center sticky top-0 z-40'>
            <Image src='/assets/logo-short.png' alt='Logo' width={100} height={100} loading='lazy' />

            <div className='flex items-center gap-4 bg-white rounded-md py-1.5 px-3'>
                <Link href='https://whatsapp.com/channel/0029VbBF8NT3rZZXmQj4mh34' target='_blank'>
                    <PiWhatsappLogo size={28} color='#25d366' />
                </Link>
                <Link href='https://www.instagram.com/aaguita_?igsh=YTQ5Z2M0dWE5dXdi' target='_blank'>
                    <PiInstagramLogoLight size={28} color='#d6249f' />
                </Link>
                <Link href='https://www.tiktok.com/@aaguita_' target='_blank'>
                    <PiTiktokLogoLight size={28} color='#000000' />
                </Link>
            </div>

            <div className='flex items-center gap-2'>
                {/* Botón de Filtro */}
                <button
                    aria-label='Abrir filtros'
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative p-2.5 hover:bg-brand-accent rounded-full transition-all active:scale-90 cursor-pointer
                    ${isOpen || selectedCategories.length > 0 ? 'ring-blue-500 text-blue-600' : 'ring-gray-200 text-gray-500'}`}
                >
                    <FilterIcon size={24} color='white' />
                    {/* Indicador de filtros activos */}
                    {selectedCategories.length > 0 && (
                        <span className='absolute top-2 right-2 h-2.5 w-2.5 bg-blue-600 rounded-full border-2 border-white'></span>
                    )}
                </button>
                {/* Menú Dropdown (Multiselect) */}
                {isOpen && (
                    <div className='absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-3 z-30'>
                        <div className='flex items-center justify-between px-2'>
                            <h4 className='text-sm font-bold text-gray-400 uppercase tracking-wider'>Categorías</h4>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='cursor-pointer'
                                aria-label='Cerrar filtros'
                            >
                                <XIcon color='red' size={16} />
                            </button>
                        </div>
                        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                            {categories.map(category => {
                                const isSelected = selectedCategories.includes(category.id);
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => toggleCategory(category.id)}
                                        className={`flex items-center justify-between w-full p-2.5 rounded-xl text-sm transition-colors cursor-pointer
                                    ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                                    >
                                        {category.name}
                                        {isSelected && <CheckIcon size={16} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                {/* Boton del carrito */}
                <button
                    onClick={() => setDrawer(true)}
                    className='relative p-2.5 text-slate-700 hover:bg-brand-accent rounded-full transition-all active:scale-90 cursor-pointer'
                    aria-label='Abrir carrito'
                >
                    <ShoppingBagIcon size={24} strokeWidth={2} color='white' />
                    {/* Badge de cantidad */}
                    {total > 0 && (
                        <span className='absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm'>
                            {total}
                        </span>
                    )}
                </button>
            </div>

        </header>
    );
};