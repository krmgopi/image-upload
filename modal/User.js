import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
