// src/components/OrderTracking.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTracking = () => {
  const [paidOrders, setPaidOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [localPendingOrders, setLocalPendingOrders] = useState([]);
  const [returnedOrders, setReturnedOrders] = useState([]);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const localPending = JSON.parse(localStorage.getItem("pendingOrder")) || [];

      if (user?.isLoggedIn && user.token) {
        fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const paid = data.filter(order => order.status === "paid");
            const delivered = data.filter(order => order.status === "delivered");
            const returned = data.filter(order => order.status === "returned");
            const pending = data.filter(order => order.status === "pending");

            setPaidOrders(paid);
            setDeliveredOrders(delivered);
            setReturnedOrders(returned);
            setPendingOrders(pending);
            setLocalPendingOrders(localPending);
          })
          .catch((err) => {
            console.error("API fetch error:", err);
          });
      } else {
        setLocalPendingOrders(localPending);
      }
    } catch (e) {
      console.error("Error parsing localStorage", e);
    }
  }, []);

  const handlePayment = (order) => {
    const completeOrder = {
      ...order,
      method: "cash",
      status: "pending",
      shippingInfo: {
        address: "لم يتم التحديد",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
      },
      createdAt: order.createdAt || new Date().toISOString(),
    };

    localStorage.setItem("selectedOrderForPayment", JSON.stringify(completeOrder));
    navigate("/payment");
  };

  const handleDeleteLocalPending = (index) => {
    const updatedLocal = [...localPendingOrders];
    updatedLocal.splice(index, 1);
    localStorage.setItem("pendingOrder", JSON.stringify(updatedLocal));
    setLocalPendingOrders(updatedLocal);
    setShowMenuIndex(null);
  };

  const handleDeleteOrder = (index, section) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user?.token) return;

    const sectionMap = {
      delivered: deliveredOrders,
      paid: paidOrders,
      pending: pendingOrders,
    };

    const setSectionMap = {
      delivered: setDeliveredOrders,
      paid: setPaidOrders,
      pending: setPendingOrders,
    };

    const order = sectionMap[section][index];
    const updatedOrders = [...sectionMap[section]];
    updatedOrders.splice(index, 1);
    setSectionMap[section](updatedOrders);

    fetch(`http://localhost:5000/api/orders/${order._id}/return`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReturnedOrders([...returnedOrders, data.order]);
        setShowMenuIndex(null);
      })
      .catch(err => console.error("Return error:", err));
  };

  const handleMarkAsReceived = (order) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user?.token) return;

    fetch(`http://localhost:5000/api/orders/${order._id}/deliver`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ deliveredAt: new Date().toISOString() }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedPaid = paidOrders.filter((o) => o._id !== order._id);
        setPaidOrders(updatedPaid);
        setDeliveredOrders([...deliveredOrders, data.order]);
        setShowMenuIndex(null);
      })
      .catch((err) => console.error("Mark as delivered error:", err));
  };

  const renderOrders = (orders, section) => {
    return orders.map((order, index) => {
      const key = `${section}-${index}`;
      const isVisible = showMenuIndex === key;

      return (
        <div
          key={key}
          className={`p-2 border rounded position-relative ${section === "delivered" ? "bg-success bg-opacity-10" : section === "returned" ? "bg-danger bg-opacity-10" : ""}`}
          style={{ width: "120px", textAlign: "center", cursor: "pointer" }}
          onClick={() => setShowMenuIndex(isVisible ? null : key)}
        >
          <img
            src={order.image || "/img/default-product.png"}
            alt={order.name}
            style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "5px" }}
          />
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>{order.name}</div>
          <div style={{ fontSize: "12px" }} className="text-muted">
            {section === "delivered" ? "تم الاستلام" : section === "returned" ? "تم الإرجاع" : ""}
          </div>

          {isVisible && (
            <div
              className="position-absolute bg-white border rounded shadow-lg p-3"
              style={{ top: "0", left: "100%", minWidth: "180px", zIndex: 10, fontSize: "14px", textAlign: "start" }}
              onClick={(e) => e.stopPropagation()}>
              <div className="mb-2">
                <strong>السعر:</strong> {order.price ? `${order.price} ج.م` : "غير متوفر"}
              </div>
              <div className="mb-2">
                <strong>التاريخ:</strong>{" "}
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString("ar-EG") : "غير متاح"}
              </div>

              {(section === "paid" || section === "pending") && (
                <div className="d-grid gap-2">
                  <button className="btn btn-sm btn-outline-success" onClick={() => handleMarkAsReceived(order)}>
                    تم الاستلام
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteOrder(index, section)}>
                    إرجاع
                  </button>
                </div>
              )}

              {section === "delivered" && (
                <div className="d-grid gap-2">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteOrder(index, "delivered")}>
                    إرجاع الطلب
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="container">
      <h2 className="TextCheck my-4">Track Your Orders</h2>

      <h4 className="TextCheck">الطلبات المدفوعة</h4>
      <div className="d-flex flex-wrap gap-3">
        {paidOrders.length === 0 ? <p>لا توجد طلبات مدفوعة.</p> : renderOrders(paidOrders, "paid")}
      </div>

      <h4 className="TextCheck mt-4">الطلبات قيد الانتظار (كاش عند الاستلام)</h4>
      <div className="d-flex flex-wrap gap-3">
        {pendingOrders.length === 0 ? <p>لا توجد طلبات قيد الانتظار.</p> : renderOrders(pendingOrders, "pending")}
      </div>

      <h4 className="TextCheck mt-4">طلبات مؤكدة - لم يتم الدفع بعد</h4>
      <div className="d-flex flex-wrap gap-3">
        {localPendingOrders.length === 0 ? <p>لا توجد طلبات محلية.</p> : localPendingOrders.map((order, index) => {
          const key = `local-${index}`;
          const isVisible = showMenuIndex === key;

          return (
            <div
              key={key}
              className="p-2 border rounded bg-primary bg-opacity-10 position-relative"
              style={{ width: "120px", textAlign: "center", cursor: "pointer" }}
              onClick={() => setShowMenuIndex(isVisible ? null : key)}
            >
              <img
                src={order.image || "/img/default-product.png"}
                alt={order.name}
                style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div style={{ fontSize: "14px", fontWeight: "bold" }}>{order.name}</div>
              <div style={{ fontSize: "12px" }} className="text-muted">Local Pending</div>

              {isVisible && (
                <div
                  className="position-absolute bg-white border rounded shadow-lg p-3"
                  style={{ top: "0", left: "100%", minWidth: "180px", zIndex: 10, fontSize: "14px", textAlign: "start" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-2">
                    <strong>السعر:</strong> {order.price ? `${order.price} ج.م` : "غير متوفر"}
                  </div>
                  <div className="mb-2">
                    <strong>تاريخ الإضافة:</strong>{" "}
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString("ar-EG") : "غير متاح"}
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-outline-success" onClick={() => handlePayment(order)}>
                      دفع الطلب
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteLocalPending(index)}>
                      حذف الطلب
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h4 className="TextCheck mt-4">الطلبات المستلمة</h4>
      <div className="d-flex flex-wrap gap-3">
        {deliveredOrders.length === 0 ? <p>لا توجد طلبات مستلمة.</p> : renderOrders(deliveredOrders, "delivered")}
      </div>

      <h4 className="TextCheck mt-4">الطلبات المرتجعة</h4>
      <div className="d-flex flex-wrap gap-3">
        {returnedOrders.length === 0 ? <p>لا توجد طلبات مرتجعة.</p> : renderOrders(returnedOrders, "returned")}
      </div>
    </div>
  );
};

export default OrderTracking;
