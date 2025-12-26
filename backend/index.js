import express from "express";
import cors from "cors";
import "./firebaseAdmin.js";

import usersRoutes from "./routes/users.js";
import suppliersRoutes from "./routes/suppliers.js";
import purchaseOrdersRoutes from "./routes/purchaseOrders.js";
import dashboardRoutes from "./routes/dashboard.js";
import ordersRoutes from "./routes/orders.js";



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Admin backend running");
});

/* Routes */
app.use("/api/users", usersRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/purchase-orders", purchaseOrdersRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/orders", ordersRoutes);


app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
