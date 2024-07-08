import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'An error occurred');
      }

      if (result.success) {
        setMessage({ type: 'success', text: 'User created successfully!' });
      } else {
        setMessage({ type: 'danger', text: 'An error occurred' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: `Network error: ${error.message}` });
    }
  };

  return (
    <Container className="mt-5 text-white">
      <h2 className="text-center mb-4">Signup Form</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit} className='custom-list-item p-5 rounded'>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            required
          />
        </Form.Group>
        <Button className="btn btn-primary mb-2 mt-2" style={{ backgroundColor: 'orange', borderColor: '#FAD689' }} type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignupForm;
