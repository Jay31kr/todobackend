import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
console.log("JWT SECRET =", process.env.ACCESS_TOKEN_SECRET);

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "1d";

export function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}
