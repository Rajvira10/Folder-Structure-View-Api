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

export default FolderModel;
