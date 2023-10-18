// Import necessary modules and models
import express from "express";
import FolderModel from "../models/folderSchema";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const folders = await FolderModel.find().exec();
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, parent } = req.body;

    const existingFolders = await FolderModel.find().exec();

    const isRoot = existingFolders.length === 0;

    if (parent) {
      const parentFolder = await FolderModel.findById(parent);
      if (!parentFolder) {
        return res.status(400).json({ error: "Parent folder not found" });
      }
    }

    const folder = new FolderModel({ name, parent, isRoot }); // Pass isRoot value
    const savedFolder = await folder.save();

    res.status(201).json(savedFolder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const folderId = req.params.id;

  const folder = await FolderModel.findById(folderId);
  if (!folder) {
    return res.status(404).json({ error: "Folder not found" });
  }

  if (folder.isRoot) {
    return res.status(400).json({ error: "Cannot delete the root folder" });
  }

  try {
    await FolderModel.findByIdAndDelete(folderId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
