import { api, params } from '@/constans/api';
import { Category } from '@/types/category';

export const getCategories = async () => {
    try {
        const response = await api.get('/category', { searchParams: params }).json();
        console.log('SERVER', response)
        return response as Category[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}