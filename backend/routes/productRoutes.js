const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/*
   GET PRODUCTS
   GET /api/products
   GET /api/products?category=Birthday
*/
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    // ✅ SIMPLE STRING FILTER (NO REGEX, NO ObjectId)
    if (category && category !== "All") {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.json(products);

  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
   GET SINGLE PRODUCT
*/
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    console.error("GET SINGLE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
   CREATE PRODUCT
*/
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
   UPDATE PRODUCT
*/
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
   DELETE PRODUCT
*/
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;