import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routerAuth = new Router();

routerAuth.post("/registration", AuthController.reg);
routerAuth.post("/login", AuthController.login);
routerAuth.delete("/login", AuthController.logout);
routerAuth.get("/me", authMiddleware, AuthController.me);
routerAuth.put(
  "/update_password",
  authMiddleware,
  AuthController.updatePassword,
);

export default routerAuth;
