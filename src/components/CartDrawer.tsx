'use client';

import { useCart } from '@/store/useCart';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { MinusIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
import { Exchange } from '@/types/exchange';

interface Props {
    exchange: Exchange
}

export const CartDrawer = ({ exchange }: Props) => {
    const { cart, isDrawerOpen, setDrawer, removeFromCart, decreaseQuantity, addToCart } = useCart();
    const totalUsd = cart.reduce((acc, item) => acc + (item.basePrice * item.quantity), 0);

    const rate = Math.trunc(exchange.promedio * 100) / 100;
    const totalBs = Math.trunc((totalUsd * rate) * 100) / 100;

    return (
        <>
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
                                <div key={item.cartItemId} className='flex flex-col gap-3 bg-gray-50 p-3 rounded-lg'>
                                    <span className='font-semibold'>{item.name}</span>

                                    <div className='flex justify-between items-center'>
                                        <div className='gray-500'>{item.basePrice} $ x {item.quantity}</div>
                                        {item.selectedSize && (
                                            <span className="inline-block px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase rounded-md border border-brand-primary/20">
                                                Talla: {item.selectedSize}
                                            </span>
                                        )}
                                    </div>
                                    {/* Controles de Cantidad */}
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => decreaseQuantity(item.cartItemId)}
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
                                        <button onClick={() => removeFromCart(item.cartItemId)} className='text-red-400 text-sm cursor-pointer'>
                                            <Trash2Icon size={20} strokeWidth={2} />
                                        </button>
                                    </div>

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
                                <span>Tasa:</span>
                                <span>{rate} Bs</span>
                            </div>
                            <div className='flex justify-between text-sm text-gray-500'>
                                <span>Total Bs:</span>
                                <span>{totalBs} Bs</span>
                            </div>
                            <a
                                href={generateWhatsAppLink(cart, totalUsd, exchange.promedio)}
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