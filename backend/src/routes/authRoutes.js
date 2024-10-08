const express = require("express");
const { signup, login } = require("../controllers/AuthController");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.export = {authRouter};
