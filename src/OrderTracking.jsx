import React, { useEffect, useState } from "react";
import { FaCalendarPlus, FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrderIndex, setActiveOrderIndex] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(savedOrders);
  }, []);

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
    setActiveOrderIndex((prev) => (prev === index ? null : index));
  };

  const deliveredOrders = orders.filter((order) => order.delivered);
  const pendingOrders = orders.filter((order) => !order.delivered);

  return (
    <div className="container">
      <h2 className="TextCheck my-4">Track Your Orders</h2>

      {/* الطلبات قيد التوصيل */}
      <h4 className="TextCheck">Current Orders</h4>
      <div className="d-flex flex-wrap gap-3">
        {pendingOrders.length === 0 ? (
          <p>No pending orders.</p>
        ) : (
          pendingOrders.map((order, index) => {
            const globalIndex = orders.indexOf(order);
            return (
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
                    <strong>Payment made:</strong> <FaRegCheckCircle fontSize={18} color="green" /> <br />
                    <strong>Received:</strong> <FaRegCircleXmark fontSize={18} color="red" /> <br />

                    <button className="btn BProfile btn-sm btn-outline-success mt-2" onClick={() => toggleDelivered(globalIndex)}>
                      Confirm receipt
                    </button>
                    <button className="btn BProfile btn-sm btn-outline-danger mt-2 ms-2" onClick={() => handleDeleteOrder(globalIndex)}>
                      Return the order
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* الطلبات المستلمة */}
      <div className="mt-5">
        <h4 className="TextCheck">Received Orders</h4>
        <div className="d-flex flex-wrap gap-3">
          {deliveredOrders.length === 0 ? (
            <p>No orders received yet.</p>
          ) : (
            deliveredOrders.map((order, index) => {
              const globalIndex = orders.indexOf(order);
              return (
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
                    <FaCalendarPlus /> {order.orderedAt}
                  </div>
                  <button className="btn BProfile btn-sm btn-outline-danger mt-2" onClick={() => handleDeleteOrder(globalIndex)}>
                    Return the order
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
