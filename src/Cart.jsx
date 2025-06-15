import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button'
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [shipping] = useState(30); // سعر التوصيل

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

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = totalCost + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3> The Cart Empty</h3>
        <p className="text-muted"> Start Shopping .</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="TextCart mb-4 text-star">  Shopping Cart</h2>

      {/* جدول المنتجات */}
      <div className="table-responsive">
        <table className="table table-secondary text-center align-middle ">
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
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => updateQuantity(item.id, "dec")}
                    >
                    <FaMinus size={12} color="#17504C" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => updateQuantity(item.id, "inc")}
                    >
                    <FaPlus size={12} color="#17504C" />
                    </button>
                  </div>
                </td>
                <td>{(item.price * item.quantity).toFixed(2)} EGP</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    <FaTrash size={18} color="#17504C" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نموذج الحساب */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h4 className="mb-3 text-center">Payment details</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Total quantity</label>
              <input
                type="number"
                className="form-control"
                value={totalQuantity}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total price</label>
              <input
                type="text"
                className="form-control"
                value={`${totalCost.toFixed(2)} EGP`}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery price</label>
              <input
                type="text"
                className="form-control"
                value={`${shipping.toFixed(2)} EGP`}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Grand total</label>
              <input
                type="text"
                className="form-control"
                value={`${finalTotal.toFixed(2)} EGP`}
                readOnly
              />
            </div>
            <Link to="/checkout" className="d-grid gap-2" size="lg">
                <Button variant="light" className="btnCart" size="lg">CheckOut</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
