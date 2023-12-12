const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const router = express.Router();

// Products (Protected Route)
router.get("/products", authMiddleware, async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get("https://dummyjson.com/products");
    const productsData = response.data.products;

    // Process each product in the array
    for (const productData of productsData) {
      // Check if the product with the same ID already exists in the database
      const existingProduct = await Product.findOne({ id: productData.id });

      if (!existingProduct) {
        // If the product doesn't exist, save it to MongoDB
        const newProduct = new Product({
          id: productData.id,
          title: productData.title,
          description: productData.description,
          price: productData.price,
          discountPercentage: productData.discountPercentage,
          rating: productData.rating,
          stock: productData.stock,
          brand: productData.brand,
          category: productData.category,
          thumbnail: productData.thumbnail,
          images: productData.images,
        });

        await newProduct.save();
      }
    }

    // Fetch all products from MongoDB
    const allProducts = await Product.find({}, { _id: 0, __v: 0 });

    // Group products by category
    const groupedProducts = groupProductsByCategory(allProducts);

    res.status(200).json(groupedProducts);
  } catch (error) {
    console.error("Error fetching and processing products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to group products by category
const groupProductsByCategory = (products) => {
  const groupedProducts = {};
  products.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push({
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
    });
  });
  return groupedProducts;
};

module.exports = router;
