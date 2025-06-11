import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarPlus,FaRegCircleXmark } from 'react-icons/fa6';
import {FaRegCheckCircle } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    image: ""
  });
  const [orders, setOrders] = useState([]);
  const [activeOrderIndex, setActiveOrderIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!storedUser || !storedUser.isLoggedIn) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setFormData({
        fullName: storedUser.fullName || "",
        phone: storedUser.phone || "",
        email: storedUser.email || "",
        image: storedUser.image || ""
      });
    }

    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(history);
  }, [navigate]);

  const handleLogout = () => {
    const updatedUser = { ...user, isLoggedIn: false };
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    setMessage("You have successfully logged out.");
    setTimeout(() => navigate("/login"), 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    setMessage("Profile updated successfully.");
    setEditMode(false);
  };

  const toggleDelivered = (index) => {
    const updatedOrders = [...orders];
    const now = new Date();

    if (!updatedOrders[index].delivered) {
      updatedOrders[index].delivered = true;
      updatedOrders[index].deliveredAt = now.toISOString();
    } else {
      updatedOrders[index].delivered = false;
      updatedOrders[index].deliveredAt = null;
    }

    setOrders(updatedOrders);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
  };

  const toggleOrderDetails = (index) => {
    setActiveOrderIndex(prev => (prev === index ? null : index));
  };

  const deliveredOrders = orders.filter(order => order.delivered);
  const pendingOrders = orders.filter(order => !order.delivered);

  return (
    <div className="container">
      <h2 className="TextCheck my-5">Your Profile</h2>

      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <div className='date'>
        <div className="bob">
          <img
            src={formData.image || "/img/features3.png"}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
          />
          {editMode && (
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mt-2" />
          )}
        </div>

        <div>
          {editMode ? (
            <>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control my-2" placeholder="Full Name" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control my-2" placeholder="Phone" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control my-2" placeholder="Email" />
              <button className="btn btn-success my-1" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary mx-2" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <div  style={{ fontSize: '22px', fontWeight: '400' }}>
              <span style={{ fontWeight: 'bolder' }}>{user.fullName || "غير متوفر"}</span>
              <br /> {user.phone || "غير متوفر"}
              <p style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {user.email || "غير متوفر"}
              </p>

            </div>
          )}

          {!editMode && (
            <button className="btn btn-primary my-1" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
          <button className="btn btn-danger mx-2 my-1" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>

      {/* الطلبات قيد التوصيل */}
      <div className="mt-5">
        <h4 className='TextCheck' >Your current requests</h4>
        <div className="d-flex flex-wrap gap-3">
          {pendingOrders.length === 0 ? (
            <p>There are no requests currently.</p>
          ) : (
            pendingOrders.map((order, index) => (
              <div
                key={index}
                className="p-2 border rounded"
                style={{ width: "120px", textAlign: "center", cursor: "pointer", position: "relative" }}
                onClick={() => toggleOrderDetails(index)}
              >
                <img
                  src={order.image || "/img/default-product.png"}
                  alt={order.name}
                  style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                />
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>{order.name}</div>

                {activeOrderIndex === index && (
                  <div
                    className="border p-2 mt-2 bg-light"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 10,
                      width: "250px",
                      fontSize: "13px",
                      textAlign: "start"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <strong>Order date:</strong> {order.orderedAt} <br />
                    <strong>Payment made:</strong> <FaRegCheckCircle fontSize={18} color='green' />             
                     <br />
                    <strong>Received:</strong><FaRegCircleXmark fontSize={18} color='red' /><br />

                    <button className="btn BProfile btn-sm btn-outline-success mt-2" onClick={() => toggleDelivered(orders.indexOf(order))}>
                      Confirm receipt
                    </button>

                    <button className="btn BProfile btn-sm btn-outline-danger mt-2 ms-2" onClick={() => handleDeleteOrder(orders.indexOf(order))}>
                        Return the order
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* الطلبات المستلمة */}
      <div className="mt-5">
        <h4 className='TextCheck'>Received requests</h4>
        <div className="d-flex flex-wrap gap-3">
          {deliveredOrders.length === 0 ? (
            <p>No requests received yet.</p>
          ) : (
            deliveredOrders.map((order, index) => (
              <div
                key={index}
                className="p-2 border rounded position-relative bg-success bg-opacity-10"
                style={{ width: "120px", textAlign: "center" }}
              >
                <img
                  src={order.image || "/img/default-product.png"}
                  alt={order.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "10px",
                    marginTop: "10px"
                  }}
                />
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>{order.name}</div>
                <div style={{ fontSize: "12px" }}>
                  <FaCalendarPlus />
                  {order.orderedAt}
                </div>
                <button className="btn BProfile btn-sm btn-outline-danger mt-2" onClick={() => handleDeleteOrder(orders.indexOf(order))}>
                    Return the order
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
