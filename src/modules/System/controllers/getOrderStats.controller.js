// controllers/orderInsights.controller.js
import Order from "../../../models/order.js";
import mongoose from "mongoose";

export const getOrderInsights = async (req, res) => {
  try {
    const last12Months = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          },
          isPaid : true
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const statusDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      message: "Order insights retrieved successfully",
      insights: {
        monthlyData: last12Months,
        statusData: statusDistribution,
      },
    });
  } catch (error) {
    console.error("Insights error:", error);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};
