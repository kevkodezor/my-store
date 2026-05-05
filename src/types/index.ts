export interface Product {
    id: string;
    name: string;
    basePrice: number;
    imageUrl: string;
    description?: string;
    categoryId: string;
    sizes: string[];
}

export interface CartItem extends Product {
    cartItemId: string;
    quantity: number;
    selectedSize?: string;
}