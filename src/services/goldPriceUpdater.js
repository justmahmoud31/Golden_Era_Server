import axios from "axios";
import Product from "../models/product.js";

const XAU_GRAM = 31.1035;

export const startGoldPriceUpdater = () => {
  setInterval(async () => {
    try {
      const response = await axios.get(`${process.env.GOLD_PRICE}/price/XAU`);
      const goldPriceXAU = response.data.price;
      const pricePerGram = goldPriceXAU / XAU_GRAM;

      const goldProducts = await Product.find({ type: "Gold" });

      for (const product of goldProducts) {
        if (!product.karat || !product.size) continue;

        const karatRatio = product.karat / 24;
        product.price = +(pricePerGram * karatRatio * product.size).toFixed(2);
        await product.save();
      }

      console.log(`[CRON] Updated ${goldProducts.length} gold products at ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      console.error("CRON gold price update failed:", err.response?.data || err.message);
    }
  }, 90 * 1000); // every 90 seconds
};
