import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure this file contains your custom styles

const Sidebar = ({ isOpen, toggleSidebar ,handleLogout}) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>×</button>
      <ul className="sidebar-nav">
        <li>
          <Link to="/" onClick={toggleSidebar}>Home</Link>
        </li>
        {localStorage.getItem("token") && (
          <>
            <li>
              <Link to="/recentorders" onClick={toggleSidebar}>Recent Orders</Link>
            </li>
            <li>
              <Link to="/myorders" onClick={toggleSidebar}>🛒 Cart</Link>
            </li>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        )}
        {!localStorage.getItem("token") && (
          <>
            <li>
              <Link to="/login" onClick={toggleSidebar}>Login</Link>
            </li>
            <li>
              <Link to="/SignUp" onClick={toggleSidebar}>SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
