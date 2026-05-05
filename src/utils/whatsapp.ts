import { CartItem } from '@/types';

export const generateWhatsAppLink = (cartItems: CartItem[], totalUsd: number, exchangeRate: number) => {
    const phoneNumber = '5844241580357';
    const totalBs = (totalUsd * exchangeRate).toFixed(2);

    let message = `Hola, quiero realizar el siguiente pedido:%0A%0A`;
    cartItems.forEach((item) => {
        // Si tiene talla, la añadimos al string
        const sizeText = item.selectedSize ? ` (Talla: ${item.selectedSize})` : '';

        message += `• ${item.quantity}x ${item.name}${sizeText} - $${item.basePrice}%0A`;
    });

    message += `%0A*Total USD:* ${totalUsd.toFixed(2)} $`;
    message += `%0A*Total Bs:* ${totalBs} Bs`;

    message += `%0A¡Quedo atent@ para coordinar el pago!`;

    return `https://wa.me/${phoneNumber}?text=${message}`;
};