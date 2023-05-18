import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const navigateHandle = (path) => {
        navigate(path);
    }
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul>
                    <li style={{ fontWeight: "600", fontSize: 21 }}>eCommerce</li>
                    <li onClick={() => { navigateHandle("/") }}>Products</li>
                    <li onClick={() => { navigateHandle("/cart") }}>Cart</li>
                    <li onClick={() => { navigateHandle("/create") }}>Add a Product +</li>
                </ul>
            </div>
            <div className="navbar-right">
                <span>Hii, John Doe</span>
                <img src="https://picsum.photos/200" alt="Profile" />
            </div>
        </nav>
    );
};

export default NavBar;
