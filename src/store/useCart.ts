import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartState {
    cart: CartItem[];
    isDrawerOpen: boolean;
    searchQuery: string;
    // Acciones
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    setDrawer: (open: boolean) => void;
    setSearchQuery: (query: string) => void;
    decreaseQuantity: (id: string) => void;
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
            const existing = state.cart.find(i => i.id === product.id);
            if (existing) {
                return { cart: state.cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
        removeFromCart: (id) => set((state) => ({
            cart: state.cart.filter(i => i.id !== id)
        })),
        clearCart: () => set({ cart: [] }),
        setDrawer: (open) => set({ isDrawerOpen: open }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
        decreaseQuantity: (id: string) => set((state) => ({
            cart: state.cart.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        })),
        // categories
        selectedCategories: [],
        toggleCategory: (category) => set((state) => {
            const isSelected = state.selectedCategories.includes(category);
            return {
                selectedCategories: isSelected
                    ? state.selectedCategories.filter(c => c !== category)
                    : [...state.selectedCategories, category]
            };
        }),
    })
);