import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/* GET /api/users - Fetch all users */
router.get("/", async (req, res) => {
  try {
    const usersSnap = await db.collection("users").get();
    const users = usersSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* PUT /api/users/:userId/loyalty - Add loyalty points */
router.put("/:userId/loyalty", async (req, res) => {
  try {
    const { userId } = req.params;
    const { points } = req.body;

    if (!points || isNaN(points)) {
      return res.status(400).json({
        success: false,
        error: "Invalid points value"
      });
    }

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const currentPoints = userDoc.data().loyaltyPoints || 0;
    const newPoints = currentPoints + Number(points);

    await userRef.update({
      loyaltyPoints: newPoints
    });

    res.json({
      success: true,
      data: {
        userId,
        loyaltyPoints: newPoints
      }
    });
  } catch (error) {
    console.error("Error updating loyalty points:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* PUT /api/users/:userId/status - Update user status */
router.put("/:userId/status", async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Status is required"
      });
    }

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    await userRef.update({
      status: status
    });

    res.json({
      success: true,
      data: {
        userId,
        status
      }
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;