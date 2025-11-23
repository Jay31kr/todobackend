import { verifyAccessToken } from "../utils/jwt.js";
import ApiError from "../utils/apiError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) throw new ApiError(401, "Authentication required");

    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};