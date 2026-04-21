import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/users.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

connectDB();

export default app; // ← no app.listen() !
