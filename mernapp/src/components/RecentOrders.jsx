import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders/recent');
        setRecentOrders(response.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="container mt-4 text-white">
      <h2>Recent Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {recentOrders.map((order) => (
            <li className="list-group-item custom-list-item mb-3" key={order._id}>
              <div className="row align-items-center">
                <div className="col">
                  <strong>Order ID:</strong> {order._id}
                </div>
                <div className="col">
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </div>
              </div>
              <div className="col">
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id} className="row align-items-center mb-2">
                      <div className="col-auto">
                        <img
                          src={item.img} // Assuming item.img contains the URL of the image
                          alt={item.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Adjust dimensions and styling as needed
                        />
                      </div>
                      <div className="col">
                        {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentOrders;
