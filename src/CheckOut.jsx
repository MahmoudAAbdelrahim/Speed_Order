import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    altPhone: "",
    city: "",
    district: "",
    area: "",
    address: "",
  });

  const [cart, setCart] = useState([]);
  const [shipping] = useState(30);
  const [message, setMessage] = useState({ text: "", type: "" }); //  رسالة

  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = totalCost + shipping;

  useEffect(() => {
     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (storedCart.length === 0) {
    navigate("/Cart");
    setMessage({ text: "Your cart is empty, please add products to continue.", type: "danger" });
    return;
  }
  setCart(storedCart);
  const storedInfo = JSON.parse(localStorage.getItem("checkoutInfo"));
  if (storedInfo) {
    setFormData(storedInfo);
  if (message.text) {
    const timer = setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    return () => clearTimeout(timer);
  }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = ["fullName", "phone", "city", "district", "area", "address"];
  const missingFields = requiredFields.filter((field) => formData[field].trim() === "");

  if (missingFields.length > 0) {
    setMessage({ text:"Please fill in all required fields to continue with your order.", type: "danger" });
    return;
  }

localStorage.setItem("checkoutInfo", JSON.stringify(formData));
localStorage.setItem("selectedOrder", JSON.stringify(cart)); //  ده المهم

  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user || !user.isLoggedIn || !user.token) {
    setMessage({ text: " You must log in first.", type: "danger" });
    setTimeout(() => {
      navigate("/login?redirect=/checkout");
    }, 1500);
    return;
  }
try {
  const oldOrders = JSON.parse(localStorage.getItem("pendingOrder")) || [];
  const newOrders = [...oldOrders, ...cart];
  localStorage.setItem("pendingOrder", JSON.stringify(newOrders));

  // رسالة نجاح
  setMessage({ text: "Order submitted successfully, redirecting to payment ✔✔ .", type: "success" });

  // بعد 1.5 ثانية روح لصفحة الدفع
  setTimeout(() => {
    localStorage.removeItem("cart"); // فضي السلة
    navigate("/payment");
  }, 1500);
} catch (error) {
  console.error(error);
  setMessage({ text: "Error submitting your order. Please try again ❌.", type: "danger" });
}
};


  return (
    <div className="container Login my-5">
      <h2 className="TextCheck  mb-4 text-center" style={{fontSize:'30px', fontWeight:'bold'}}> CheckOut</h2>

    
      {/* عرض المنتجات */}
      <div className="row mb-5">
        <h5 className="TextCheck"> Required products</h5>
        {cart.map((item) => (
          <div key={item.id} className="d-flex align-items-center gap-3 mb-2">
            <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover" }} />
            <div>
              <p className=" TextCheck mb-1 fw-bold">{item.name}</p>
              <p className="mb-0 text-muted">
                Quantity: {item.quantity} - price: {(item.price * item.quantity).toLocaleString()} EGP
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* نموذج البيانات */}
      <form onSubmit={handleSubmit} className=" FormCheck row g-3">
        <div className="col-md-6">
          <input  type="text" placeholder="fullName" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <input placeholder="phone" type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <input placeholder="altPhone" type="tel" name="altPhone" className="form-control" value={formData.altPhone} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <input placeholder="city" type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <input placeholder="district" type="text" name="district" className="form-control" value={formData.district} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <input placeholder="area" type="text" name="area" className="form-control" value={formData.area} onChange={handleChange} required />
        </div>

        <div className="col-12">
          <textarea placeholder="address" name="address" rows="3" className="form-control" value={formData.address} onChange={handleChange} required></textarea>
        </div>

        <div className="col-12 text-end">
          <h5> <span className="TextCheck">{finalTotal.toFixed(2)} EGP</span></h5>
        </div>

        <div className="text-center">
            {message.text && (
        <div className={`alert alert-${message.type} text-center`} role="alert">
          
          {message.text}
        </div>
      )}
          <button type="submit" className="btnLogin">
            Confirm and Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
