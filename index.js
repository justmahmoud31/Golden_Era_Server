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
import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use("/webhook", stripeWebhook);
// Ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors({
  origin: [process.env.FRONTEND_URL,"https://turmusayacreations.com","http://localhost:3000"], 
  credentials: true,
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Then:
const uploadDir = path.join(__dirname, "./uploads");

app.use(
  "/uploads",
  express.static(uploadDir, {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
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
