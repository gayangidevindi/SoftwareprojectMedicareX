import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/* GET ALL SUPPLIERS */
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("suppliers").get();
    const suppliers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ADD NEW SUPPLIER */
router.post("/", async (req, res) => {
  try {
    const supplier = {
      name: req.body.name,
      contactPerson: req.body.contactPerson,
      email: req.body.email,
      phone: req.body.phone,
      categories: req.body.categories || [],
      rating: 0,
      status: "active",
      createdAt: new Date()
    };

    const docRef = await db.collection("suppliers").add(supplier);

    res.json({ id: docRef.id, ...supplier });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
