const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
}, { _id: false });

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: userSchema,
    },

    shippingAddress: {
      type: shippingSchema,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);