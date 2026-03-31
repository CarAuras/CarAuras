const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  dealer_id: { type: mongoose.ObjectId, ref: "User", required: true },
  car_name: { type: String, required: true }, // Example: "2018 Toyota Corolla LE"
  brand: { type: String, required: true }, // Example: "Toyota"
  model: { type: String, required: true }, // Example: "Corolla"
  year: { type: Number, required: true }, // Example: 2018
  price: { type: Number, required: true }, // Example: 12000 (in USD or chosen currency)
  mileage: { type: String, required: true }, // In miles or km
  fuel_type: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    required: true,
  },
  transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
  body_type: {
    type: String,
    enum: [
      "Sedan",
      "SUV",
      "Truck",
      "Hatchback",
      "Coupe",
      "Convertible",
      "Van",
      "Other",
    ],
    required: true,
  },
  condition: {
    type: String,
    enum: [
      "New",
      "Like New",
      "Excellent",
      "Good",
      "Fair",
      "Poor",
      "Needs Repair",
      "For Parts Only",
    ],
    required: true,
  },
  description: { type: String }, // Additional details about the car
  place: { type: String, required: true }, // Example: "Los Angeles, CA"
  images: [{ type: String }], // Array of image URLs
  features: [{ type: String }], // Example: ["Sunroof", "Bluetooth", "Backup Camera"]
  seats: { type: Number, required: true }, // Example: 5
  engine_size: { type: String }, // Example: "2.0L 4-cylinder"
  status: {
    type: String,
    enum: ["Available", "Sold", "Pending"],
    default: "Available",
  },
  is_negotiable: { type: Boolean, default: false },
  views: { type: Number, default: 0 }, // Track how many times the car listing is viewed
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Cars = mongoose.model("Cars", CarSchema);
module.exports = Cars;
