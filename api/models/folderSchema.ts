import mongoose, { Document, Schema } from "mongoose";

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

interface FolderDocument extends Document {
  name: string;
  parent: FolderDocument | null;
  isRoot: boolean;
}

const FolderModel = mongoose.model<FolderDocument>("Folder", folderSchema);

const createRootFolder = async () => {
  const rootFolderExists = await FolderModel.exists({
    name: "Root",
    isRoot: true,
  });

  if (!rootFolderExists) {
    const rootFolder = new FolderModel({ name: "Root", isRoot: true });
    await rootFolder.save();
  }
};

export default FolderModel;
export { createRootFolder };
