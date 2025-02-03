import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        try {
            const params = {
                title: title || '',
                author: author || '',
                genre: genre || '',
            };

            const response = await axios.get('http://127.0.0.1:8000/search', {
                params
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    useEffect(() => {
        handleSearch();
    }, [title,author,genre]);

    return (
        <div className="search-page">
            <h1>Search Books</h1>
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="" disabled>Select Genre</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Humour">Humour</option>
                    <option value="Suspense" >Suspense</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Autobiography">Autobiography</option>
                    <option value="Biography">Biography</option>
                    <option value="Others">Others</option>                
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.id} className="book-card">
                            <img src={book.imageUrl} alt={book.title} className="book-image" />
                            <h3 className = "h3">{book.title}</h3>
                            <p className = "p"><strong>Author:</strong> {book.author}</p>
                            <p className = "p"><strong>Genre:</strong> {book.genre}</p>
                            <p className = "p"><strong>Price:</strong> {book.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
