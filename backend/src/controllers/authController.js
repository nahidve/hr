import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Employee from "../models/Employee.js";

export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role = "Employee",
    } = req.body;

    const existing =
      await User.findOne({
        email,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      });

    if (role === "Employee") {
      await Employee.create({
        name,
        email,
      });
    }

    res.status(201).json({
      message:
        "User created",
    });
  } catch (error) {
    res.status(500).json({
      error:
        error.message,
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    res.json({
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error:
        error.message,
    });
  }
};

export const me = async (
  req,
  res
) => {
  res.json(req.user);
};

export const getProfile =
  async (req, res) => {
    try {
      let employee =
        await Employee.findOne({
          email:
            req.user.email,
        });

      if (!employee) {
        if (req.user.role !== "Employee") {
          return res.status(404).json({
            message:
              "Employee profile not found",
          });
        }

        employee = await Employee.create({
          name: req.user.name || "",
          email: req.user.email,
        });
      }

      res.json(employee);
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  };