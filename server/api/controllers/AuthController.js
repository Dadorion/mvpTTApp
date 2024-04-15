import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthService from "../services/AuthService.js";
import generateAccessToken from "../../config/generateToken.js";

class AuthController {
  static async checkBlackList(token) {
    const answer = await AuthService.blacklist(token);
    return answer;
  }

  static async reg(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Полученные данные не прошли валидацию на сервере",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const candidate = await AuthService.getUser(email);

      if (candidate) {
        return res.status(409).json({
          error: "UserAlreadyExists",
          message: "Пользователь с указанными учетными данными уже существует",
        });
      }

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const answer = await AuthService.addUser(email, hashPassword);
      return res.json({
        answer,
        message: `Пользователь ${email} успешно зарегистрирован`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка сервера при регистрации",
        errors: error
      });
    }
  }

  static async updatePassword(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Полученные данные не прошли валидацию на сервере",
          errors: errors.array(),
        });
      }

      const { userId } = req.user;
      const { oldPassword, newPassword, password, passwordRepeat } = req.body;
      const user = await AuthService.getUserWithId(userId);

      if (!user) {
        return res.status(409).json({
          error: "UserNotExists",
          message: "Пользователь с указанным ID не существует",
        });
      }

      const saltRounds = 10;
      const oldPasswordBody = await bcrypt.hash(oldPassword, saltRounds);
      const oldPasswordDB = user.password;

      if (oldPasswordBody !== oldPasswordDB) {
        return res.status(400).json({
          message: "Указан неверный пароль",
        });
      }

      if (password !== passwordRepeat) {
        return res.status(400).json({
          message: "Новые пароли не совпадают",
        });
      }

      const hashPassword = await bcrypt.hash(newPassword, saltRounds);

      await AuthService.updatePassword(hashPassword, userId);
      return res.json({
        code: 0,
        message: `Пароль для ${user.email} успешно изменен`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка сервера при регистрации",
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.getUser(email);

      if (!user) {
        return res.status(400).json({
          message: `Пользователь с E-mail ${email} не найден`,
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          message: `Введен неверный пароль`,
        });
      }

      const token = generateAccessToken(user.id);

      return res.json(token);
    } catch (error) {
      return res.status(500).json({
        message: "Ошибка сервера при попытке входа",
      });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decodedToken = jwt.decode(token);
      const expiration = new Date(decodedToken.exp * 1000);

      // Добавление токена в черный список
      await AuthService.logout(token, expiration);

      res.json({
        code: 0,
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async me(req, res) {
    try {
      const { userId } = req.user;
      const answer = await AuthService.me(userId);

      if (!answer) {
        res.status(204).json("Нет ответа от сервера. <(-_-)>");
      } else {
        res.status(200).json(answer);
      }
    } catch (e) {
      res.status(500).json(`Перехваченная ошибка: ${e}`);
    }
  }
}

export default AuthController;
