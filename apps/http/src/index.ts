import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./routes/v1";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/v1/userRoutes";

// import { userRouter } from "./routes/user.route";
// import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(cookieParser());

// console.log(process.env.ACCESS_TOKEN_SECRET);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use("/v1/auth", router);
app.use("/v1/user", userRouter);
// app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
