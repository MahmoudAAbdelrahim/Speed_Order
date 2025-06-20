const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number },
  quantity: { type: Number, default: 1 },
  method: { type: String }, // visa, paypal, etc
  shippingInfo: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "delivered", "returned"],
    default: "pending",
  },
  delivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  returned: { type: Boolean, default: false },
  orderedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
