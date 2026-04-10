'use client';

import { useCart } from '@/store/useCart';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { MinusIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';

export const CartDrawer = () => {
    const { cart, isDrawerOpen, setDrawer, removeFromCart, decreaseQuantity, addToCart } = useCart();
    const exchangeRate = 36.5;
    const totalUsd = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            {/* Overlay: Fondo oscuro al abrir */}
            <div
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setDrawer(false)}
            />

            {/* Panel Lateral */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='p-6 flex flex-col h-full'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-bold'>Tu Pedido</h2>
                        <button onClick={() => setDrawer(false)} className='cursor-pointer text-2xl text-gray-400'>
                            <XIcon size={24} strokeWidth={2} />
                        </button>
                    </div>

                    <div className='flex-1 overflow-y-auto space-y-4'>
                        {cart.length === 0 ? (
                            <p className='text-center text-gray-500 mt-10'>Tu carrito está vacío</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className='flex items-center gap-3 bg-gray-50 p-3 rounded-lg'>
                                    <div className='flex-1'>
                                        <p className='font-semibold text-sm'>{item.name}</p>
                                        <p className='text-xs text-gray-500'>{item.price} $ x {item.quantity}</p>
                                    </div>
                                    {/* Controles de Cantidad */}
                                    <div className='flex items-center bg-gray-100 rounded-lg p-1 gap-2'>
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className='p-1 hover:bg-white rounded shadow-sm transition-colors'
                                            disabled={item.quantity === 1}
                                        >
                                            <MinusIcon size={14} />
                                        </button>

                                        <span className='text-xs font-bold w-4 text-center'>{item.quantity}</span>

                                        <button
                                            onClick={() => addToCart(item)}
                                            className='p-1 hover:bg-white rounded shadow-sm transition-colors'
                                        >
                                            <PlusIcon size={14} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className='text-red-400 text-sm cursor-pointer'>
                                        <Trash2Icon size={20} strokeWidth={2} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className='border-t pt-6 space-y-3'>
                            <div className='flex justify-between items-end'>
                                <span className='text-gray-600'>Total USD:</span>
                                <span className='text-2xl font-bold text-blue-600'>${totalUsd.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-sm text-gray-500'>
                                <span>Total Bs:</span>
                                <span>{(totalUsd * exchangeRate).toFixed(2)} Bs</span>
                            </div>
                            <a
                                href={generateWhatsAppLink(cart, totalUsd, exchangeRate)}
                                target='_blank'
                                className='block w-full bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-2xl font-bold transition-colors shadow-lg shadow-green-100'
                            >
                                Confirmar por WhatsApp
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};