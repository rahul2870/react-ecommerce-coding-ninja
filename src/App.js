// Import required dependencies
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import Navbar from './components/Navbar';

import AllProductsPage from './pages/AllProductsPage';
import CreatePage from './pages/CreatePage';
// import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

import { fetchProducts } from './store/reducer';
import { Dummy_product_list, Seed_data_storage_key } from './db';
import useLocalStorage from 'use-local-storage';

// App component
function App() {

    const dispatch = useDispatch();
    const [product_list, set_product_list] = useLocalStorage(Seed_data_storage_key);

    // Fetch products from the API on component mount
    useEffect(() => {
        console.log("product_list : ", product_list)
        if (product_list?.length) {
            dispatch(fetchProducts(product_list));
        } else {
            set_product_list(Dummy_product_list);
            dispatch(fetchProducts(Dummy_product_list));
        }
    }, [dispatch]);

    return <>
        <ToastContainer />
        <Navbar />
        <Routes>
            <Route exact path="/" element={<AllProductsPage />}> </Route>
            <Route path="/create" element={<CreatePage />}> </Route>
            {/* <Route path="/product/:id" element={<ProductDetailPage />}> </Route> */}
            <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
    </>
}

export default App;
