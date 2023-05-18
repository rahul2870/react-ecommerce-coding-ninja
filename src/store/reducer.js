// reducers.js

import { createSlice } from '@reduxjs/toolkit';
import { Cart_storage_key, Seed_data_storage_key } from '../db';

// Define initial state
const initialState = {
    products: [],
    cart: JSON.parse(localStorage.getItem(Cart_storage_key)) || [],
};

// Create products slice
const productsSlice = createSlice({
    name: 'products',
    initialState: initialState.products,
    reducers: {
        fetchProducts: (state, action) => {
            return action.payload;
        },
        createProduct: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(Seed_data_storage_key, JSON.stringify(state));
        },
        deleteProduct: (state, action) => {
            const id = action.payload;
            const index = state.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem(Seed_data_storage_key, JSON.stringify(state));
            }
        },
        updateProduct: (state, action) => {
            const { id, updatedItem } = action.payload; 
            const index = state.findIndex((item) => item.id == id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updatedItem };
                localStorage.setItem(Seed_data_storage_key, JSON.stringify(state));
            }
        }
    },
});

// Create cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState.cart,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            localStorage.setItem(Cart_storage_key, JSON.stringify(state));
        },
        updateCart: (state, action) => {
            const { id, updatedItem } = action.payload;
            const index = state.findIndex((item) => item.id === id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updatedItem };
                localStorage.setItem(Cart_storage_key, JSON.stringify(state));
            }
        },
        deleteFromCart: (state, action) => {
            const id = action.payload;
            const index = state.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem(Cart_storage_key, JSON.stringify(state));
            }
        },
    },
});

// Extract action creators from slices
export const { fetchProducts, createProduct, deleteProduct, updateProduct } = productsSlice.actions;
export const { addToCart, updateCart, deleteFromCart } = cartSlice.actions;

// Combine reducers
const rootReducer = {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
};

export default rootReducer;