'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { CheckIcon, FilterIcon } from 'lucide-react';

export const SearchBar = ({ categories }: { categories: string[] }) => {
    const { searchQuery, setSearchQuery, selectedCategories, toggleCategory } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-6 relative flex gap-3">
            {/* Input de Búsqueda */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué estás buscando hoy?"
                className="flex-1 p-4 rounded-2xl border-none bg-white shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />

            {/* Botón de Filtro */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-2xl bg-white shadow-sm ring-1 transition-all flex items-center justify-center cursor-pointer
                    ${isOpen || selectedCategories.length > 0 ? 'ring-blue-500 text-blue-600' : 'ring-gray-200 text-gray-500'}`}
            >
                <FilterIcon size={20} />
                {/* Indicador de filtros activos */}
                {selectedCategories.length > 0 && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
                )}
            </button>

            {/* Menú Dropdown (Multiselect) */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-3 z-30">
                    <h4 className="text-xs font-bold text-gray-400 mb-2 px-2 uppercase tracking-wider">Categorías</h4>
                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                        {categories.map(category => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <button
                                    key={category}
                                    onClick={() => toggleCategory(category)}
                                    className={`flex items-center justify-between w-full p-2.5 rounded-xl text-sm transition-colors cursor-pointer
                                    ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    {category}
                                    {isSelected && <CheckIcon size={16} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};