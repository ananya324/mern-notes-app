const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc   Register new user
// @route  POST /api/users/register
// @access Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // 2. Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 3. Create user
  const user = await User.create({
    name,
    email,
    password, // gets hashed automatically
  });

  // 4. Send response
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("LOGIN BODY:", req.body);

  // 1. Validate
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // 2. Find user
  const user = await User.findOne({ email });

  // 3. Compare password
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};
