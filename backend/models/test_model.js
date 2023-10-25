import mongoose from "mongoose";
const testSchema = new mongoose.Schema(
  {
    image_path: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

export default Test;
