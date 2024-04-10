import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./api/routes/authRouter.js"
import mainRouter from "./api/routes/mainRouter.js"

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.static(path.resolve(path.dirname(""), "public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.dirname(""), "public", "index.html"));
});

app.use("/auth", authRouter);
app.use("/api", mainRouter);

export default app;

async function startApp() {
  try {
    app.listen(PORT, () => {
      console.log("SERVER WORK ON PORT ", PORT);
    });
  } catch (e) {
    console.error(e.message);
  }
}

startApp();
