require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("../be/src/routes/index");
const usersRouter = require("../be/src/routes/users");
const authRouter = require("../be/src/routes/");
const petRouter = require("../be/src/routes/pets");
const walletRouter = require("../be/src/routes/wallet");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoose = require("mongoose");
const { sendResponse, AppError } = require("./src/helpers/utils");
const mongoURI = process.env.MONGODB_URI;
const CELENODE = process.env.CELENODE;
const NUMIA_API_KEY = process.env.NUMIA_API_KEY;
mongoose
  .connect(mongoURI)
  .then(() => console.log(`connected to ${mongoURI}`))
  .catch((err) => console.log(err));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/pets", petRouter);
app.use("/wallets", walletRouter);

app.use((req, res, next) => {
  const err = new AppError(404, "Not Found");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});
module.exports = app;
