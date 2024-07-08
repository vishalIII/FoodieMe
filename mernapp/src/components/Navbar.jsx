import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar component
import './Navbar.css'; // Ensure this file contains your custom styles

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebarOpen state
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">FoodieMe</Link>
          <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("token") && (
                <li>
                  <Link className="nav-link active me-4" aria-current="page" to="/recentorders">
                    Recent Orders
                  </Link>
                </li>
              )}
            </ul>

            <div className='d-flex text-white'>
              {localStorage.getItem("token") ? (
                <>
                  <Link className="nav-link active me-4" aria-current="page" to="/myorders">
                    🛒 Cart
                  </Link>
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="btn btn-success mx-2" to="/login">Login</Link>
                  <Link className="btn btn-success mx-2" to="/SignUp">SignUp</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Sidebar className="side" isOpen={sidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
    </div>
  );
};

export default Navbar;
