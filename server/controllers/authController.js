import User from "../models/userSchema.js";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, clerkId, phoneNumber, imageUrl } =
    req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        clerkId,
        phoneNumber,
        imageUrl,
      });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully",user:newUser });
    } else {
      return res
        .status(400)
        .json({ message: "User already exists", user:user });
    }
  } catch (error) {
    console.log(error, "error from the database");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  console.log("fn reached");
  const { id } = req.params;
  try {
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "success", user: user });
  } catch (error) {
    console.log(error, "error from the database");
    return res.status(500).json({ message: "Internal server error" });
  }
};
