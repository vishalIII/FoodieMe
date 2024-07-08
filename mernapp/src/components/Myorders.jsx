import React from 'react';
import axios from 'axios'; // Ensure axios is imported
import { useCart } from './CartContext'; // Import the useCart hook from your CartContext


function MyOrders() {
  const { cartItems, dispatch } = useCart();

  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', itemId });
  };

  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  const handleCheckout = async () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    const order = {
      items: cartItems,
      totalAmount,
      user: "UserID" // Replace with actual user ID from context or state
    };
    try {
      await axios.post('http://localhost:3000/orders', order);
      dispatch({ type: 'CLEAR_CART' }); // Clear cart after successful order
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const calculateTotalCartPrice = () => {
    return cartItems.reduce((total, item) => total + calculateTotalPrice(item.quantity, item.price), 0);
  };

  return (
    <div className="container mt-4 text-white">
      <h2>My Orders</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li className="list-group-item custom-list-item mb-2" key={item._id}>
                <div className="row align-items-center">
                  <div className="col-auto">
                    <img
                      src={item.img} // Assuming item.img contains the URL or path to the small image
                      alt={item.name} // Alt text for accessibility
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Adjust dimensions and styling as needed
                    />
                  </div>
                  <div className="col">{item.name}</div>
                  <div className="col">
                    Quantity: {item.quantity}
                  </div>
                  <div className="col">Unit Price: ${item.price}</div>
                  <div className="col">Total Price: ${calculateTotalPrice(item.quantity, item.price)}</div>
                  <div className="col-auto">
                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h4>Total Cart Price: ${calculateTotalCartPrice()}</h4>
          </div>
          <button className="btn btn-primary mb-2 mt-2" style={{ backgroundColor: 'orange', borderColor: '#FAD689' }} onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default MyOrders;
