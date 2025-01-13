const jwt = require("jsonwebtoken");
const { AppError } = require("../helpers/utils");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Token not provided", 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new AppError("Token expired", 401);
      }
      throw new AppError("Invalid token", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
