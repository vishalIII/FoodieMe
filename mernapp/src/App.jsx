import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Login from './screens/Login';
import SignupForm from './screens/SignupForm';
import MyOrders from './components/Myorders'; // Ensure the file name matches
import RecentOrders from './components/RecentOrders';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className='app-container'>
                <Routes>
                    <Route path='/' element={<Home />} /> {/* Route to display items on the home page */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignupForm />} />
                    <Route path='/myorders' element={<MyOrders />} />
                    <Route path='/recentorders' element={<RecentOrders />} />
                </Routes>
                </div>
                
            </div>
        </Router>
    );
}

export default App;
