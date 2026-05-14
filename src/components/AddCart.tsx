'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { CheckIcon } from 'lucide-react';
import { Product } from '@/types';

export const AddCart = ({ product }: { product: Product }) => {
    const { addToCart, cart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // 1. Verificamos si el producto tiene tallas configuradas
    const hasSizes = product.sizes && product.sizes.length > 0;

    // 2. Generamos el ID dinámico basado en la talla actual seleccionada
    const currentCartItemId = `${product.id}-${selectedSize || 'unique'}`;

    // 3. Verificamos si ESTA combinación exacta ya está en el carrito
    const isAdded = cart.some(item => item.cartItemId === currentCartItemId);

    const handleAddToCart = (e: React.MouseEvent) => {
        // Evita que el clic propague hacia un <Link> padre (ej. en ProductCard)
        e.preventDefault();
        e.stopPropagation();

        if (hasSizes && !selectedSize) {
            return alert('Por favor, selecciona una talla antes de añadir al carrito.');
        }

        if (isAdded) return;

        // Añadimos el producto con la propiedad extra de la talla
        addToCart({
            ...product,
            ...(selectedSize && { selectedSize })
        });
    };

    return (
        <div className='flex flex-col gap-3 w-full'>
            {/* Renderizado Condicional del Selector de Tallas */}
            {hasSizes && (
                <div className='flex flex-col gap-2'>
                    <span className='text-xs font-bold text-gray-500 uppercase tracking-wider'>
                        Seleccionar Talla:
                    </span>
                    <div className='flex flex-wrap gap-3'>
                        {product.sizes!.map((size: string) => (
                            <button
                                key={size}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedSize(size);
                                }}
                                className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Botón Principal[cite: 7] */}
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2
                    ${isAdded
                        ? 'bg-blue-air text-blue-deep border border-blue-deep cursor-default'
                        : 'bg-blue-deep text-white hover:bg-blue-deep/80 active:scale-95 cursor-pointer shadow-md hover:shadow-lg'
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
    );
}