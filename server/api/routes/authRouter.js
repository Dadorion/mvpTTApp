import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routerAuth = new Router();

routerAuth.post(
  "/registration",
  [
    check("password_1", "Пароль должен быть больше 10 и меньше 4 символов")
      .trim()
      .isLength({
        min: 4,
        max: 10,
      }),
    check("password_2", "Пароль должен быть больше 10 и меньше 4 символов")
      .trim()
      .isLength({
        min: 4,
        max: 10,
      }),
    check("email", "Введите корректный E-mail").trim().isEmail(),
  ],
  AuthController.reg
);

routerAuth.post("/login", AuthController.login);
routerAuth.delete("/login", AuthController.logout);
routerAuth.get("/me", authMiddleware, AuthController.me);
routerAuth.put(
  "/update_my_password",
  authMiddleware,
  [
    check("newPasswordOne", "Пароль должен быть длиннее 4 и короче 10 символов")
      .trim()
      .isLength({
        min: 4,
        max: 10,
      }),
    check("newPasswordTwo", "Пароль должен быть длиннее 4 и короче 10 символов")
      .trim()
      .isLength({
        min: 4,
        max: 10,
      }),
  ],
  AuthController.updatePassword,
);

export default routerAuth;
