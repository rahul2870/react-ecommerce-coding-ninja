// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

// Create the Redux store
const store = configureStore({
    reducer: rootReducer,
});

export default store;
