import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.data.success) {
        setMessage('Login successful!');
        // Save token to localStorage or state
        // console.log(response)
        localStorage.setItem('token', response.data.token);
        navigate("/")
        // Redirect or update UI as needed
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="custom-list-item p-5 rounded">
              <h5 className="card-title">Login</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2 mt-2" style={{ backgroundColor: 'orange', borderColor: '#FAD689' }}>Login</button>
              </form>
              {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
