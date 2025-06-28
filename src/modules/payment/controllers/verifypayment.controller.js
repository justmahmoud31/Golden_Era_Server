import Order from "../../../models/order.js";
import stripe from "../../../utils/stripe.js";


export const verifySession = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const orderId = session.metadata.orderId;
      const order = await Order.findById(orderId);
      if (order && !order.isPaid) {
        order.isPaid = true;
        order.paidAt = new Date();
        await order.save();
      }

      return res.status(200).json({ paid: true });
    } else {
      return res.status(200).json({ paid: false });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ error: "Failed to verify payment" });
  }
};
