export interface Product {
    id: string;
    name: string;
    price: number; // Siempre en USD para base
    image: string;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}