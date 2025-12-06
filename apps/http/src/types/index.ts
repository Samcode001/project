import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character long"),
  username: z.string().min(1, "Username must be at least 1 character long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = z.object({
  username: z.string().min(1, "Username must be at least 1 character long"),
  password: z.string(),
});
