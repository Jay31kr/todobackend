// import {ApiError} from "../utils/ApiError.js";
import ApiError from "../utils/apiError.js"

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({ success: false, message: "Something went wrong" });
};
