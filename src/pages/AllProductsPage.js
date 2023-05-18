import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, deleteFromCart, deleteProduct } from '../store/reducer';

const AllProductsPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const cart = useSelector((state) => state.cart);
    const [productList, setProductList] = useState([]);
    const [is_sort_asc, set_is_sort_asc] = useState(false);
    const [deletingModalProuct, setdeletingModalProuct] = useState(null);


    const handleProductEdit = (productId) => {
        navigate(`/create?id=${productId}`);
    };

    const handleProductDelete = (productId) => {
        // Implement the logic to delete the product
        // Show alert/notification after deletion
        dispatch(deleteProduct(productId));
        setdeletingModalProuct(null);
        toast("Item Deleted successfully!");
    };

    const handleSort = () => {
        is_sort_asc ?
            setProductList(productList.slice().sort((a, b) => b.price - a.price)) :
            setProductList(productList.slice().sort((a, b) => a.price - b.price));

        set_is_sort_asc(!is_sort_asc);
    };

    const handleAddToCart = (product) => {
        // Implement the logic to add the product to the cart 
        dispatch(addToCart(product));
        toast("Item Added successfully!");
    };

    const handleRemoveFromCart = (id) => {
        // Implement the logic to add the product to the cart  
        dispatch(deleteFromCart(id));
        toast("Item Removed successfully!");
    };

    useEffect(() => {
        setProductList(products);
    }, [products]);

    return (
        <div style={{ margin: 20 }}>
            {/* Delete modal confirmation */}
            {deletingModalProuct &&
                <div className='confirm-modal'>
                    <div className='modal-box'>
                        <h4>Are you sure you want to Delete "{deletingModalProuct?.name}"</h4>
                        <div className='modal-btns'>
                            <button onClick={() => { handleProductDelete(deletingModalProuct?.id) }}>Yes</button>
                            <button onClick={() => { setdeletingModalProuct(null); }}>No</button>
                        </div>
                    </div>
                </div>}
            {/* Render the product list */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ padding: "10px 20px", marginBottom: 20 }} onClick={handleSort}>Sort by Price</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {productList.map((product) => {

                    const isInCart = cart?.find(_ => _.id == product?.id);
                    return <div key={product.id} className="product">

                        <div className='product_left'>
                            <img src={product.imageUrl} alt={product.name} />
                            <div>
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">Rs.{product.price}</p>
                            </div>
                        </div>

                        <div className='product_right'>
                            <p className="product-description">{product.description}</p>
                            <div>
                                <button onClick={() => handleProductEdit(product.id)}>Edit</button>
                                <button onClick={() => setdeletingModalProuct(product)}>Delete</button>
                                <button onClick={() =>
                                    isInCart ? handleRemoveFromCart(product.id) : handleAddToCart(product)
                                }>{isInCart ? "Remove From Cart" : "Add to Cart"}</button>
                            </div>
                        </div>

                    </div>
                })}
            </div>

        </div >
    );
};

export default AllProductsPage;
