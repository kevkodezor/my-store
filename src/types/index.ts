export interface Product {
    id: string;
    name: string;
    basePrice: number;
    imageUrl: string;
    categoryId: string;
}

export interface CartItem extends Product {
    quantity: number;
}