// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div className="main-container">
                <Header />
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
