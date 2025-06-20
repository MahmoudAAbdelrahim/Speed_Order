const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// 🟢 Get all orders for logged-in user
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// 🟢 Create new order
router.post("/", auth, async (req, res) => {
  const { name, image, price, quantity, status, method, shippingInfo } = req.body;
  const newOrder = await Order.create({
    name,
    image,
    price,
    quantity,
    status,
    method,
    shippingInfo,
    userId: req.userId,
  });

  res.status(201).json(newOrder);
});

// 🟡 Mark order as Paid
router.patch("/:id/pay", auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = "paid";
  await order.save();
  res.json({ message: "Marked as paid", order });
});

// 🟡 Mark order as Delivered
router.patch("/:id/deliver", auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = "delivered";
  order.delivered = true;
  order.deliveredAt = req.body.deliveredAt || new Date();

  await order.save();
  res.json({ message: "Marked as delivered", order });
});

// 🟡 Mark order as Returned
router.patch("/:id/return", auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = "returned";
  order.returned = true;

  await order.save();
  res.json({ message: "Marked as returned", order });
});

// 🔴 Delete order
router.delete("/:id", auth, async (req, res) => {
  const deleted = await Order.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!deleted) return res.status(404).json({ message: "Order not found" });

  res.json({ message: "Order deleted" });
});

module.exports = router;
