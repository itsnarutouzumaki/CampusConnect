import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    avtar: {
      type: String,
      default:
        "https://i.pinimg.com/736x/8a/4e/86/8a4e8645128bb789f14b53fc4985afed.jpg",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
