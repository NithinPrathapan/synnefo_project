import express from "express";
import User from '../models/userSchema.js';

export const signup = async (req, res) => {
  const { clerkId, firstName, lastName, email, imageUrl, phoneNumber } =
    req.body;

  try {
    const user = await User.findOne({
      clerkId: clerkId,
    });
    if (!user) {
      const newUser = new User({
        clerkId,
        firstName,
        lastName,
        email,
        imageUrl,
        phoneNumber,
      });
      await newUser.save();
      return res.status(201).json({
        message: "user created successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "error creating user",
    });
  }
};
