// components/ItemsList.js

import React, { useState, useEffect } from 'react';

function ItemsList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems(); // Fetch items when component mounts
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/item'); // Adjust URL as per your backend setup
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data.items); // Assuming your response has a structure { items: [...] }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>
            <h2>Items List</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name}</li> // Adjust based on your item structure
                ))}
            </ul>
        </div>
    );
}

export default ItemsList;