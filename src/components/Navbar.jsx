import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="/src/assets/Logo.png" alt="Logo" />
                    <span>SIMS PPOB</span>
                </Link>
                <div className="navbar-menu">
                    <NavLink to="/topup" className={({ isActive }) => isActive ? 'active' : ''}>Top Up</NavLink>
                    <NavLink to="/transaction" className={({ isActive }) => isActive ? 'active' : ''}>Transaction</NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Akun</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
