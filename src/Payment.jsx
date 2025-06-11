import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handlePayment = (e) => {
  e.preventDefault();

  const orderData = {
    products: JSON.parse(localStorage.getItem("cart")) || [],
    method: paymentMethod,
    orderedAt: new Date().toLocaleString(),
  };

  const oldOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
  localStorage.setItem(
    "orderHistory",
    JSON.stringify([
      ...oldOrders,
      ...orderData.products.map((p) => ({
        ...p,
        orderedAt: orderData.orderedAt,
      })),
    ])
  );

  localStorage.removeItem("cart");

  setMessage(`تم الدفع باستخدام ${paymentMethod} بنجاح!`);

  // ✅ بعد ظهور الرسالة، انتظر ثانيتين وروّح لتتبع الطلب
  setTimeout(() => {
    navigate("/OrderTracking");
  }, 2000);
};


  return (
    <div className="container mt-5">
      <h2 className="mb-4">صفحة الدفع</h2>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handlePayment}>
        <div className="mb-3">
          <label className="form-label">اختر طريقة الدفع:</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="visa">فيزا / ماستركارد</option>
            <option value="paypal">باي بال</option>
            <option value="fawry">فوري</option>
            <option value="cash">كاش عند الاستلام</option>
          </select>
        </div>

        {paymentMethod === "visa" && (
          <div className="mb-3">
            <label className="form-label">رقم البطاقة:</label>
            <input type="text" className="form-control" placeholder="**** **** **** ****" required />
            <label className="form-label mt-2">تاريخ الانتهاء:</label>
            <input type="text" className="form-control" placeholder="MM/YY" required />
            <label className="form-label mt-2">CVV:</label>
            <input type="text" className="form-control" placeholder="***" required />
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="mb-3">
            <label className="form-label">بريد باي بال:</label>
            <input type="email" className="form-control" placeholder="you@example.com" required />
          </div>
        )}

        {paymentMethod === "fawry" && (
          <div className="mb-3">
            <label className="form-label">رقم الهاتف لفوري:</label>
            <input type="text" className="form-control" placeholder="01xxxxxxxxx" required />
          </div>
        )}

        {paymentMethod === "cash" && (
          <p className="alert alert-info">سيتم الدفع كاش عند استلام المنتج.</p>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          تأكيد الدفع
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
