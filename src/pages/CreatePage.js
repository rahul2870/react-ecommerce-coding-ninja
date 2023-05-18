
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createProduct, updateProduct } from '../store/reducer';


function generateId() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumeric.length);
        id += alphanumeric.charAt(randomIndex);
    }

    return id;
}

const Form = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [productToEdit, setProductToEdit] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const validationErrors = {};
        if (!formData.name) {
            validationErrors.name = 'Name is required';
        }
        if (!formData.description) {
            validationErrors.description = 'Description is required';
        }
        if (!formData.price) {
            validationErrors.price = 'Price is required';
        }
        if (!formData.imageUrl) {
            validationErrors.imageUrl = 'Image URL is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Submit logic goes here
            if (id) {
                dispatch(updateProduct({
                    id,
                    updatedItem: {
                        ...formData,
                        id
                    }
                }))
                navigate("/");
            } else {
                dispatch(createProduct({
                    id: generateId(),
                    ...formData
                }));
            }

            // Reset form data
            setFormData({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
            });

            // Clear errors
            setErrors({});
        }
    };

    useEffect(() => {
        if (id) {
            const product = products?.find(_ => _.id == id)
            console.log("product : ", product);
            setProductToEdit(product);
            setFormData(product);
        }
    }, [id])

    return <div>
        <h3 style={{ fontSize: 31, fontWeight: "400", margin: "30px 0px 0px 40px" }}>{id ? "Update Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    className="form-input"
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData?.description}
                    onChange={handleChange}
                    className="form-input"
                />
                {errors.description && <span className="error">{errors.description}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData?.price}
                    onChange={handleChange}
                    className="form-input"
                />
                {errors.price && <span className="error">{errors.price}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">imageUrl:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData?.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                />
                {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
            </div>
            <button type="submit" className="form-button">Submit</button>
            {id && <button onClick={() => { navigate("/") }} className="form-button-cancel">Cancel</button>}
        </form>
    </div>
};

export default Form;
