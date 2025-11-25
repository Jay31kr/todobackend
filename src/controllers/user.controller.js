import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { signAccessToken } from "../utils/jwt.js";

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
};

// SIGNUP
export const signup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new ApiError(400, "All fields required");
  }

  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email already exists");

  const user = await User.create({ userName, email, password });

  const token = signAccessToken({ userId: user._id.toString() });

  res.cookie("accessToken", token, { ...cookieOptions, maxAge: 86400000 });

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    },
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new ApiError(400, "Email & password required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const match = await user.comparePassword(password);
  if (!match) throw new ApiError(401, "Invalid credentials");

  const token = signAccessToken({ userId: user._id.toString() });

  res.cookie("accessToken", token, { ...cookieOptions, maxAge: 86400000 });

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    },
  });
});

// LOGOUT
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.json({ success: true, message: "Logged out" });
});

// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ success: true, data: { user } });
});
