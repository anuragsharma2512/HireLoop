import { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/api-error.js";
import { logger } from "../config/logger.js";
import { env } from "../config/env.js";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
) => {
  const statusCode =
    error instanceof ApiError ? error.statusCode : 500;

  const message =
    error instanceof ApiError
      ? error.message
      : "Internal server error";

  logger.error(
    {
      error,
      method: req.method,
      url: req.originalUrl,
    },
    "Request failed",
  );

  res.status(statusCode).json({
    success: false,
    message,

    ...(env.NODE_ENV !== "production" && {
      stack: error.stack,
    }),
  });
};