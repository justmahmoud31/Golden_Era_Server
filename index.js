import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import { bootstrap } from "./src/bootstrap.js";
import { startGoldPriceUpdater } from "./src/services/goldPriceUpdater.js";
import paymentRoutes from "./src/modules/payment/routes/payment.routes.js";
import stripeWebhook from "./src/modules/payment/webhook/webhook.js";


const app = express();

app.use("/webhook", stripeWebhook);
// Ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/payment", paymentRoutes);
// Load routes
bootstrap(app);
startGoldPriceUpdater();
// Connect DB then start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
