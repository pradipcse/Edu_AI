import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      select: false   // Password not returned by default in queries
    },

    role: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
      default: "student"
    },

    // Optional fields
    avatar: {
      type: String, // profile photo URL
      default: ""
    }
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;
