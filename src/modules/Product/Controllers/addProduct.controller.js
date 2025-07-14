import Product from "../../../models/product.js";
import axios from "axios";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      category,
      subCategory,
      stock,
      rate,
      isFeatured,
      karat,
      size,
      hasName,
      defaultPrice
    } = req.body;

    let finalPrice = 0;

    if (type === "Gold") {
      if (![18, 21, 24].includes(Number(karat)) || !size) {
        return res.status(400).json({ message: "Karat (18, 21, 24) and size (grams) are required for gold." });
      }

      const response = await axios.get(`${process.env.GOLD_PRICE}/price/XAU`);
      const goldPriceXAU = response.data.price; 
      const pricePerGram = goldPriceXAU / 31.1035;
      const karatRatio = karat / 24;
      finalPrice = +(pricePerGram * karatRatio * size).toFixed(2);
    }

    const cover_images = req.files?.cover_images?.map((file) => file.path) || [];
    const images = req.files?.images?.map((file) => file.path) || [];

    const product = await Product.create({
      name,
      price: finalPrice,
      karat,
      size,
      description,
      type,
      category,
      subCategory,
      stock,
      rate,
      isFeatured,
      cover_images,
      images,
      hasName,
      defaultPrice
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Product creation error:", err.response?.data || err.message);
    res.status(400).json({ message: "Error creating product" });
  }
};
