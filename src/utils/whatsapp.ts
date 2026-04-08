import { CartItem } from '@/types';

export const generateWhatsAppLink = (cart: CartItem[], totalUsd: number, exchangeRate: number) => {
    const phoneNumber = '584149047047'; // Configurable
    const totalBs = (totalUsd * exchangeRate).toFixed(2);

    let message = `*Nuevo Pedido*%0A%0A`;
    cart.forEach(item => {
        message += `🥟 ${item.name} (x${item.quantity})%0A`;
    });

    message += `*Datos de pago*%0A%0A`;
    message += `Banco: Mercantil%0A`;
    message += `C.I: 29948160%0A`;
    message += `Teléfono: 04149047047%0A`;

    message += `💵 %0A*Total USD:* ${totalUsd.toFixed(2)} $`;
    message += `💰 %0A*Total Bs:* ${totalBs} Bs`;

    return `https://wa.me/${phoneNumber}?text=${message}`;
};