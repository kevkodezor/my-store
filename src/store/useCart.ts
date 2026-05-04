import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartState {
    cart: CartItem[];
    isDrawerOpen: boolean;
    searchQuery: string;
    // Acciones
    addToCart: (product: Product & { selectedSize?: string }) => void;
    removeFromCart: (cartItemId: string) => void;
    setDrawer: (open: boolean) => void;
    setSearchQuery: (query: string) => void;
    decreaseQuantity: (cartItemId: string) => void;
    // Helper para contar items totales
    getTotalItems: () => number;
    // Categories
    selectedCategories: string[];
    toggleCategory: (category: string) => void;
}

export const useCart = create<CartState>(
    (set, get) => ({
        cart: [],
        isDrawerOpen: false,
        searchQuery: '',
        addToCart: (product) => set((state) => {
            // Generamos el ID compuesto. Si no tiene talla, usamos 'unique'
            const cartItemId = `${product.id}-${product.selectedSize || 'unique'}`;

            const existing = state.cart.find(i => i.cartItemId === cartItemId);

            if (existing) {
                // Si ya existe ESE producto con ESA talla, sumamos cantidad
                return {
                    cart: state.cart.map(i =>
                        i.cartItemId === cartItemId
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    )
                };
            }
            // Si no existe, lo agregamos como una nueva línea
            return { cart: [...state.cart, { ...product, cartItemId, quantity: 1 }] };
        }),
        removeFromCart: (cartItemId) => set((state) => ({
            cart: state.cart.filter(i => i.cartItemId !== cartItemId)
        })),
        decreaseQuantity: (cartItemId: string) => set((state) => ({
            cart: state.cart.map(item =>
                item.cartItemId === cartItemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        })),
        clearCart: () => set({ cart: [] }),
        setDrawer: (open) => set({ isDrawerOpen: open }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
        // categories
        selectedCategories: [],
        toggleCategory: (category: string) => set((state) => {
            const isSelected = state.selectedCategories.includes(category);
            return {
                selectedCategories: isSelected
                    ? state.selectedCategories.filter(c => c !== category)
                    : [...state.selectedCategories, category]
            };
        }),
    })
);