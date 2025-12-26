import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/* ================= GET ALL PURCHASE ORDERS ================= */
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("purchaseOrders").get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      amount: doc.data().quantity * doc.data().unitPrice, // computed field
    }));

    res.json(orders);
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
