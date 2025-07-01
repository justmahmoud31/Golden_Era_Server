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

      const bulkOps = [];

      for (const product of goldProducts) {
        if (!product.karat || !product.size) continue;

        const karatRatio = product.karat / 24;
        const basePrice = pricePerGram * karatRatio * product.size;
        const finalPrice = +(basePrice * 1.10).toFixed(2); // add 10%

        bulkOps.push({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { price: finalPrice } },
          },
        });
      }

      if (bulkOps.length > 0) {
        await Product.bulkWrite(bulkOps);
      }

      console.log(`[CRON] Updated ${bulkOps.length} gold products at ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      console.error("CRON gold price update failed:", err.response?.data || err.message);
    }
  }, 90 * 1000); // every 90 seconds
};
