import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

export default mongoose.models.users || mongoose.model("users", userSchema);
