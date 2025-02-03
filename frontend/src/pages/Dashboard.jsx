import React, { useState, useEffect } from "react";
import axios from "axios";

// Base URL for the API
const API_BASE_URL = "http://127.0.0.1:8000";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [formBook, setFormBook] = useState({
        id: null,
        title: "",
        author: "",
        genre : "",
        imageUrl: "",
        price: "",
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/books`);
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormBook({
            ...formBook,
            [name]: value,
        });
    };

    const createOrUpdateBook = async () => {
        try {
            if (formBook.id) {
                // Update existing product
                await axios.put(
                    `${API_BASE_URL}/books/${formBook.id}`,
                    formBook
                );
            } else {
                // Create new product
                await axios.post(`${API_BASE_URL}/books`, formBook);
            }
            fetchBooks();
            setFormBook({
                id: null,
                title : "",
                author: "",
                genre : "",
                imageUrl: "",
                price: "",
            });
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    const startUpdate = (book) => {
        setFormBook(book);
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="dashboard page-bg">
            <h1>Books Dashboard</h1>
            <h4>Manage the Book Collection</h4>
            <div className="new-product-form island">
                <h5>
                    {formBook.id ? "Update Book" : "Create New Book  "}
                </h5>
                <input
                    type="text"
                    name="title"
                    placeholder="Book Name"
                    value={formBook.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formBook.author}
                    onChange={handleChange}
                />
                <select
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formBook.genre}
                    onChange={handleChange}>
                    <option value="" disabled>Select Genre</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Humour">Humour</option>
                    <option value="Suspense">Suspense</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Autobiography">Autobiography</option>
                    <option value="Biography">Biography</option>
                    <option value="Others">Others</option>


                </select>
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formBook.imageUrl}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={formBook.price}
                    onChange={handleChange}
                />
                <button onClick={createOrUpdateBook}>
                    {formBook.id ? "Update Book" : "Add Book"}
                </button>
            </div>
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
                            {book.author}
                        </p>
                        <p className="card-description">
                            {book.genre}
                        </p>
                        <p className="card-price">{book.price}</p>
                        <div className="buttons-container">
                            <button onClick={() => startUpdate(book)}>
                                Update
                            </button>
                            <button onClick={() => deleteBook(book.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
