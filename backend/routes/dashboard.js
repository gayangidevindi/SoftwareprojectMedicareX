import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/* TEST */
router.get("/test", (req, res) => {
  res.send("Dashboard route working");
});

/* COUNTS */
router.get("/counts", async (req, res) => {
  try {
    const users = await db.collection("users").get();
    const suppliers = await db.collection("suppliers").get();
    const products = await db.collection("products").get();
    const orders = await db.collection("orders").get();

    let totalSales = 0;
    orders.forEach(doc => {
      totalSales += doc.data().amount || 0;
    });

    res.json({
      users: users.size,
      suppliers: suppliers.size,
      products: products.size,
      totalSales
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
