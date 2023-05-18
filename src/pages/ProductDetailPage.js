// ProductDetailPage component
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = useSelector((state) =>
        state.products.find((product) => product.id === id)
    );

    const handleAddToCart = (productId) => {
        // Implement the logic to add the product to the cart
        // Show alert/notification after adding to cart
    };

    return (
        <div>
            {product && (
                <div>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <button onClick={() => handleAddToCart(product.id)}>
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
