import express from "express";
// import { userRouter } from "./routes/user.route";
// import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

// app.use("/users", userRouter);
// app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});