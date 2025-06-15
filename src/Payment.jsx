import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
  const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const shippingInfo = JSON.parse(localStorage.getItem("checkoutInfo")) || {};
    const selectedOrder = JSON.parse(localStorage.getItem("selectedOrder")) || [];
    const selectedOrderForPayment = JSON.parse(localStorage.getItem("selectedOrderForPayment")) || {};
    if (!user || !user.token || !user.isLoggedIn) {
      navigate("/login?redirect=/payment");
    }
    let ordersToPay = [];
    if (Array.isArray(selectedOrderForPayment) && selectedOrderForPayment.length > 0) {
      ordersToPay = selectedOrderForPayment;
    } else if (selectedOrderForPayment && Object.keys(selectedOrderForPayment).length > 0) {
      ordersToPay = [selectedOrderForPayment];
    } else {
      ordersToPay = selectedOrder;
    }
    if (ordersToPay.length === 0 || Object.keys(shippingInfo).length === 0) {
      setMessage("Please make sure that you complete all the details on the CheckOut page..");
    }
  }, [navigate]);
  const handlePayment = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const shippingInfo = JSON.parse(localStorage.getItem("checkoutInfo")) || {};
    const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder")) || [];
    const selectedOrder = JSON.parse(localStorage.getItem("selectedOrder")) || [];
    const selectedOrderForPayment = JSON.parse(localStorage.getItem("selectedOrderForPayment")) || {};
    let ordersToPay = [];
    if (Array.isArray(selectedOrderForPayment) && selectedOrderForPayment.length > 0) {
      ordersToPay = selectedOrderForPayment;
    } else if (selectedOrderForPayment && Object.keys(selectedOrderForPayment).length > 0) {
      ordersToPay = [selectedOrderForPayment];
    } else {
      ordersToPay = selectedOrder;
    }
    if (!user || !user.token) {
      setMessage("❌ You must log in first.");
      return;
    }
    if (ordersToPay.length === 0 || Object.keys(shippingInfo).length === 0) {
      setMessage("❌ There is not enough data to complete the request.");
      return;
    }
    try {
      const paidIds = [];
      for (const item of ordersToPay) {
        const orderData = {
          name: item.name,
          image: item.image,
          quantity: item.quantity || 1,
          price: item.price,
          status: paymentMethod === "cash" ? "pending" : "paid",
          method: paymentMethod,
          shippingInfo,
        };
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(orderData),
        });
        if (!res.ok) {
          throw new Error(" ❌ Failed to process payment.");
        }
        paidIds.push(item.id);
      }
      // تحديث pendingOrder
      const updatedPending = pendingOrder.filter(item => !paidIds.includes(item.id));
      localStorage.setItem("pendingOrder", JSON.stringify(updatedPending));
      // تحديث selectedOrder
      const updatedSelected = selectedOrder.filter(item => !paidIds.includes(item.id));
      localStorage.setItem("selectedOrder", JSON.stringify(updatedSelected));
      // تنظيف
      localStorage.removeItem("cart");
      localStorage.removeItem("selectedOrderForPayment");
      setMessage("Excelent! Your payment was successful. Redirecting to order tracking...");
      setTimeout(() => {
        navigate("/OrderTracking");
      }, 2000);
    } catch (err) {
      console.error("❌ Payment error:", err.message);
      setMessage("❌ An error occurred while processing your payment. Please try again.");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4"> Payment</h2>
      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}
      <form onSubmit={handlePayment}>
        <div className="mb-3">
          <label className="form-label">Choose your payment method:</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="visa">Visa / MasterCard</option>
            <option value="paypal">PayPal</option>
            <option value="fawry">Fawry</option>
            <option value="cash">الدفع عند الاستلام</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary"> payment </button>
        </div>
      </form>
    </div>
  );
};
export default PaymentPage;
