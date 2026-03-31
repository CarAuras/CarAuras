const mongoose = require("mongoose");
const { SUBRIPTION_PLANS } = require("../../src/constants/constants");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    business_name: { type: String },
    location: { type: String, required: true },
    address: { type: String },
    profile_picture: { type: String },
    has_physical_store: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["individual", "company"],
      default: "individual",
    },
    verified: { type: Boolean, default: false },
    subscribed: { type: Boolean, default: false },
    subscription_plan: {
      type: String,
      enum: [
        SUBRIPTION_PLANS.FREE.TITLE,
        SUBRIPTION_PLANS.PRO.TITLE,
        SUBRIPTION_PLANS.ELITE.TITLE,
      ],
      default: SUBRIPTION_PLANS.FREE.TITLE,
    },
    subscription_expires_at: { type: Date },
    post_count: { type: Number, default: 0 },
    expired_listings_count: { type: Number, default: 0 },
    deactivated: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    last_active: { type: Date, default: Date.now },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    subsciptionRemainderSent: { type: Boolean, default: false },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
