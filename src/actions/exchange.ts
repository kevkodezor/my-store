import { apiExchange } from '@/constans/api';
import { Exchange } from '@/types/exchange';

export const getExchange = async () => {

    try {
        const response = await apiExchange.get('/dolares/oficial').json();
        return response as Exchange;
    } catch (error) {
        console.error('Error fetching exchange:', error);
        throw error;
    }
}