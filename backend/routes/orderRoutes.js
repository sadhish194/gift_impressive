const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/*
   PLACE ORDER
   POST /api/orders
*/
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const {
      user,
      shippingAddress,
      orderItems,
      totalAmount,
      paymentMethod,
      status,
    } = req.body;

    // ✅ Validate required fields
    if (
      !user ||
      !shippingAddress ||
      !orderItems ||
      !totalAmount ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      user,
      shippingAddress, // ✅ NOW SAVED
      orderItems,
      totalAmount,
      paymentMethod,
      status: status || "Placed",
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
   GET ALL ORDERS
   GET /api/orders
*/
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderItems.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
   GET SINGLE ORDER
   GET /api/orders/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;