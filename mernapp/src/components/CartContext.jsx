import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.item];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.itemId); // Filter out the item with matching itemId
    case 'CLEAR_CART':
      return [];
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.itemId ? { ...item, quantity: action.quantity } : item
      );
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
