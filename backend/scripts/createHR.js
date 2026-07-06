import "dotenv/config";

import bcrypt from "bcryptjs";

import connectDB from "../src/config/db.js";

import User from "../src/models/User.js";

await connectDB();

const password =
  await bcrypt.hash(
    "Admin@123",
    10
  );

await User.create({
  name: "Admin HR",
  email: "admin@hr.com",
  password,
  role: "HR",
});

console.log(
  "HR created"
);

process.exit();