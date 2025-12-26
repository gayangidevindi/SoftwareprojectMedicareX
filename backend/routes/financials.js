import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/* GET FINANCIAL DATA */
router.get("/", async (req, res) => {
  try {
    const ordersSnap = await db.collection("orders").get();
    const purchaseSnap = await db.collection("purchaseOrders").get();

    const orders = ordersSnap.docs.map(d => d.data());
    const purchaseOrders = purchaseSnap.docs.map(d => d.data());

    res.json({ orders, purchaseOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
