import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="logo-container">
                <img src={Logo} alt="Book Store" />
            </div>
            <nav>
                <ul className="nav">
                    <li>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop" className="nav-link">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="nav-link">
                            Search
                        </Link>
                    </li>
                </ul>
            </nav>
    </header> 
    
    );
};



export default Navbar;


