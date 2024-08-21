import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import AuthController from "../controllers/authController.js";

async function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const fullToken = req.headers.authorization;
    if (!fullToken) {
      return res.status(403).json({
        message: "Пользователь не авторизован. Токен не получен",
      });
    }

    const token = fullToken.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: "Пользователь не авторизован. Токен отсутствует",
      });
    }


    const intoBlackList = await AuthController.checkBlackList(token);

    if (intoBlackList.length > 0) {
      return res.status(401).json({ error: "Token revoked" });
    }

    const decodedData = jwt.verify(token, config.secret);
    req.user = decodedData;

    return next();
  } catch (e) {
    return res.status(403).json({
      message: "Пользователь не авторизован",
    });
  }
}

export default authMiddleware;
