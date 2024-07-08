import React from 'react';


const Footer = () => {
  return (
    <footer className="footer mt-5 py-5 bg-dark text-white">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="#" className="text-white">Careers</a></li>
              <li><a href="#" className="text-white">Press</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Contact Us</a></li>
              <li><a href="#" className="text-white">Order Tracking</a></li>
              <li><a href="#" className="text-white">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
              <li><a href="#" className="text-white">LinkedIn</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Newsletter</h5>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
