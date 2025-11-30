import express from "express";
import { authenticateAccessToken } from "../../middleware/Authenticate";
import client from "@repo/db";
const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
  const { id } = req.body;
  res.send({ id });
});

userRouter.get("/profile", authenticateAccessToken, async (req, res) => {
  const userToken = (req as any).user;
  // fetch user from DB
  const user = await client.user.findUnique({
    where: {
      id: userToken.userId,
    },
  });
  // console.log(userToken, user);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ id: user.id, username: user.username });
});

userRouter.put("/set-avatar", authenticateAccessToken, async (req, res) => {
  const userToken = (req as any).user;

  const avatarID = req.body.avatar;

  const user = await client.user.findUnique({
    where: {
      id: userToken.userId,
    },
  });
  // console.log(userToken, user);
  if (!user) return res.status(404).json({ message: "User not found" });

  const userUpdate = await client.user.update({
    where: {
      id: userToken.userId,
    },
    data: {
      avatarId: avatarID,
    },
  });
  res.json({ message: "Avatar set Succesfully", user: userUpdate.avatarId });
});

userRouter.get("/avatar", authenticateAccessToken, async (req, res) => {
  const userToken = (req as any).user;
  // fetch user from DB
  const user = await client.user.findUnique({
    where: {
      id: userToken.userId,
    },
  });
  // console.log(userToken, user);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({
    avatarId: user.avatarId,
  });
});

export default userRouter;
