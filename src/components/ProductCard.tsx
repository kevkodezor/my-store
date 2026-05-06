import Image from 'next/image';
import Link from 'next/link';
import { ScanEyeIcon } from 'lucide-react';
import { Product } from '@/types';
import { AddCart } from './AddCart';

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className='group flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white h-full'>
            <div className='relative w-full aspect-square overflow-hidden'>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                    className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                    loading='eager'
                />
            </div>
            <div className='flex flex-col grow p-5 gap-2.5 justify-between'>
                <div className='grid gap-2'>
                    <h3 className='font-medium text-gray-800 line-clamp-2 leading-6'>
                        {product.name}
                    </h3>
                    <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold text-gray-900'>{product.basePrice} $</p>
                        <Link href={`/product/${product.id}`} className='p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-all active:scale-90 cursor-pointer'>
                            <ScanEyeIcon size={24} />
                        </Link>
                    </div>
                </div>
                <AddCart product={product} />
            </div>
        </div>
    );
};