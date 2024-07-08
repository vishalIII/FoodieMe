import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './ProductCard.css';

function ProductCard() {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]); // Store all items for resetting after search
    const [loading, setLoading] = useState(true);
    const { dispatch } = useCart();

    useEffect(() => {
        fetchItems(); // Initial fetch when component mounts
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/item');
            const data = response.data.map(item => ({
                ...item,
                showFullDescription: false,
                quantity: 1,
                price: Math.floor(Math.random() * 501) + 500, // Random price between 500 and 1000
            }));
            setItems(data);
            setAllItems(data); // Store all items
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', item });
    };

    const toggleDescription = (index) => {
        setItems(items.map((item, i) => i === index ? { ...item, showFullDescription: !item.showFullDescription } : item));
    };

    const handleQuantityChange = (index, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setItems(items.map((item, i) => i === index ? { ...item, quantity: newQuantity } : item));
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        // Filter items based on search term
        const filteredItems = allItems.filter(item =>
            item.CategoryName.toLowerCase().includes(searchTerm)
        );
        // Sort filtered items: show items matching search category first, then others alphabetically
        filteredItems.sort((a, b) => {
            if (a.CategoryName.toLowerCase().includes(searchTerm) && !b.CategoryName.toLowerCase().includes(searchTerm)) {
                return -1; // a should come before b
            } else if (!a.CategoryName.toLowerCase().includes(searchTerm) && b.CategoryName.toLowerCase().includes(searchTerm)) {
                return 1; // b should come before a
            } else {
                return a.CategoryName.localeCompare(b.CategoryName); // alphabetical order for others
            }
        });
        setItems(filteredItems);
    };

    return (
        <div className="container mt-4">
            <div className="search-bar-container">
                <form className="d-flex justify-content-center">
                    <input
                        className="form-control me-2 transparent-input"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearch}
                    />
                    <button className="btn btn-primary" style={{ backgroundColor: 'orange', borderColor: '#FAD689' }} type="button">Search</button>
                </form>
            </div>
            {loading ? (
                <div className="row">
                    {[1, 2, 3].map((placeholderItem) => (
                        <div className="col-md-4 mb-4" key={placeholderItem}>
                            <div className="shimmer-card">
                                <div className="shimmer-img"></div>
                                <div className="shimmer-text"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row">
                    {items.map((item, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div >
                                <img
                                    src={item.img}
                                    className="card-img-top rounded-top"
                                    alt={item.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="mycard">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{item.CategoryName}</h6>
                                    <p className="card-text">Price: ${item.price}</p> {/* Display price */}
                                    {item.showFullDescription ? (
                                        <>
                                            <p className="card-text">{item.description}</p>
                                            <a href="#" className="text-black" onClick={() => toggleDescription(index)}>Show less</a>
                                        </>
                                    ) : (
                                        <a href="#" className="text-black" onClick={() => toggleDescription(index)}>Read more</a>
                                    )}
                                    <div className="mt-2 me-2 d-flex">
                                        <label htmlFor={`quantity-${index}`} className="form-label text-muted">Quantity:</label>
                                        <select
                                            id={`quantity-${index}`}
                                            className="form-select ms-1"
                                            value={item.quantity}
                                            onChange={(event) => handleQuantityChange(index, event)}
                                        >
                                            {[...Array(10).keys()].map(i => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-primary mb-2 mt-2" style={{ backgroundColor: 'orange', borderColor: '#FAD689' }}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductCard;
