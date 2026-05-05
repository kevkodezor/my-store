import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ChevronLeftIcon } from 'lucide-react';
import { AddCart } from '@/components/AddCart';

export const DetailProduct = ({ product }: { product: Product }) => {
    return (
        <div className='grid gap-5 p-5'>
            <div className='flex jus items-center gap-5'>
                <Link href='/'>
                    <ChevronLeftIcon size={32} />
                </Link>
                <h1 className='text-2xl'>{product.name}</h1>
            </div>
            <section className='grid md:grid-cols-2 gap-10'>
                <Image
                    priority
                    fetchPriority='high'
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={500}
                    className='rounded-xl w-full'
                />
                <div className='flex flex-col gap-10'>
                    <h2 className='text-xl font-bold'>Descripción</h2>
                    <span className='text-md'>
                        {product.description || 'Sin descripción'}
                    </span>
                    <span className='text-2xl font-bold'>
                        Precio {product.basePrice} $
                    </span>
                    <AddCart product={product} />
                </div>
            </section>
        </div>
    );
}
