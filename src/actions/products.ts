'use server';

import { Product } from '@/types';
import { api, params } from '@/constans/api';

export const getProducts = async () => {

    try {
        const response = await api.get('/products', { searchParams: params }).json();
        return response as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const getProductById = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`, { searchParams: params }).json();
        return response as Product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}
