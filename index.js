import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import { bootstrap } from "./src/bootstrap.js";
import { startGoldPriceUpdater } from "./src/services/goldPriceUpdater.js";

dotenv.config();

const app = express();

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Load routes
bootstrap(app);
startGoldPriceUpdater();
// Connect DB then start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
