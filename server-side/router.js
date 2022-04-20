const express = require("express");
const { register, login, remove, update } = require("./controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.put("/update", update);
authRouter.delete("/delete", remove);

module.exports = authRouter;
