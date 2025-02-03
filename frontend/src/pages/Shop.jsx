import React, { useState, useEffect } from "react";
import axios from "axios";

// API endpoint for fetching products
const API_BASE_URL = "http://127.0.0.1:8000";

const Shop = ({ userName }) => {
    // State to hold the products, loading status, and error
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                
                const response = await axios.get("http://127.0.0.1:8000/books/");
                setBooks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="shop page-bg">
            <h1>Welcome, {userName ? userName : "User"}</h1>
            <h4>Shop the best books</h4>
            <div className="cards">
                {books.map((book) => (
                    <div key={book.id} className="card">
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="card-image"
                        />
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-description">
                            Author: {book.author}
                        </p>
                        <p className="card-description">
                            Genre: {book.genre}
                        </p>
                        <p className="card-price">Price: {book.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
