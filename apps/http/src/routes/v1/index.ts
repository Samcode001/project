import express from "express";
import { signInSchema, signUpSchema } from "../../types";
import { compare, hash } from "../../scrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const COOKIE_NAME = "jwt";
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN!;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN!;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
// console.log(process.env.ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET);

type User = { id: string; name: string; username: string; password: string };
const users = new Map<string, User>();
const refreshTokens = new Map<string, string>();

const signRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const signAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

router.post("/signup", async (req, res) => {
  // const { name, username, password } = req.body;

  const parsedData = signUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log("parsed data incorrect");
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const userId = uuidv4();
  const hashedPassword = await hash(parsedData.data.password);
  try {
    users.set(userId, {
      id: userId,
      name: parsedData.data.name,
      username: parsedData.data.username,
      password: hashedPassword,
    });

    const accessToken = signAccessToken(userId);
    const refreshToken = signRefreshToken(userId);

    res.cookie(COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/auth/refresh",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = signInSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log("parsed data incorrect");
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    const user = users.get(parsedData.data.username);
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
    const ok = await compare(parsedData.data.password, user.password);
    if (!ok) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    res.cookie(COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/auth/refresh",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies[COOKIE_NAME];
  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token" });
    return;
  }
  try {
    const { userId } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
    const accessToken = signAccessToken(userId);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  if (token) refreshTokens.delete(token);
});

export { router };
