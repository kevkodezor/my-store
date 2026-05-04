'use server';

import { Product } from '@/types';
import { api } from '@/constans/api';
import { Category } from '@/types/category';

const params = {
    'orgId': process.env.ORG_ID
}

export const getProducts = async () => {

    try {
        const response = await api.get('/products', { searchParams: params }).json();
        return response as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Categories
export const getCategories = async () => {
    try {
        const response = await api.get('/category', { searchParams: params }).json();
        return response as Category[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}