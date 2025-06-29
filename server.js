import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
// import productRoutes from "./routes/products.js";
import sectionRoutes from "./routes/sections.js";
import cards from "./routes/cards.js";
import db from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// localhost:5000
app.use("/api/auth", authRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/cards", cards);

app.get("/", (req, res) => {
  res.send("Store API (PostgreSQL) is running");
});

db.connect().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
