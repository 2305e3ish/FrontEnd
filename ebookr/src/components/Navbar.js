import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;
