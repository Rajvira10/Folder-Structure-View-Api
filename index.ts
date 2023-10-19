#!/usr/bin/env node

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import folderRoutes from "./api/routes/folders";
import { createRootFolder } from "./api/models/folderSchema";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

createRootFolder()
  .then(() => {
    console.log("Root folder created successfully.");
  })
  .catch((error) => {
    console.error("Error creating root folder:", error);
  });

app.use("/api/folders", folderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
