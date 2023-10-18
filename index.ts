import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import folderRoutes from "./api/routes/folders";

require("dotenv").config();

const app = express();

app.use(cors());

const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/folders", folderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});