import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (type === "inc") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === "dec" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalCost = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);



  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>  The Cart is empty</h3>
        <p className="text-muted">Start shopping and add your favorite products.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Cart </h2>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الإجمالي</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price.toFixed(2)} EGP</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateQuantity(item.id, "dec")}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => updateQuantity(item.id, "inc")}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{(item.price * item.quantity).toFixed(2)} EGP</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-4">
        <h4>
           ToteCost:{" "}
          <span className="text-success">{totalCost} EGP</span>
        </h4>
        <button className="btn btn-primary mt-3 px-4 py-2">
           Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
