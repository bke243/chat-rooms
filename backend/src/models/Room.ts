import mongoose , { Schema } from "mongoose";

const roomSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true }
})

export default mongoose.model("Room", roomSchema);
