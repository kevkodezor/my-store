import { CartItem } from '@/types';

export const generateWhatsAppLink = (cart: CartItem[], totalUsd: number, exchangeRate: number) => {
    const phoneNumber = '584142774829';
    const totalBs = (totalUsd * exchangeRate).toFixed(2);

    let message = `*Nuevo Pedido*%0A%0A`;
    cart.forEach(item => {
        message += `${item.name} (x${item.quantity})%0A`;
    });

    message += `%0A*Total USD:* ${totalUsd.toFixed(2)} $`;
    message += `%0A*Total Bs:* ${totalBs} Bs`;

    return `https://wa.me/${phoneNumber}?text=${message}`;
};