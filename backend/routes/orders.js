import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/* GET /api/orders - Fetch all orders */
router.get("/", async (req, res) => {
  try {
    const ordersSnap = await db.collection("orders").get();
    const orders = ordersSnap.docs.map(doc => {
      const data = doc.data();
      
      // Convert Firestore Timestamp to ISO string if exists
      let date = data.date || data.createdAt;
      if (date && date._seconds) {
        date = new Date(date._seconds * 1000).toISOString();
      } else if (date && date.toDate) {
        date = date.toDate().toISOString();
      }

      return {
        id: doc.id,
        ...data,
        date
      };
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* GET /api/orders/:orderId - Fetch single order */
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDoc = await db.collection("orders").doc(orderId).get();

    if (!orderDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "Order not found"
      });
    }

    const data = orderDoc.data();
    
    // Convert Firestore Timestamp to ISO string if exists
    let date = data.date || data.createdAt;
    if (date && date._seconds) {
      date = new Date(date._seconds * 1000).toISOString();
    } else if (date && date.toDate) {
      date = date.toDate().toISOString();
    }

    res.json({
      id: orderDoc.id,
      ...data,
      date
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;