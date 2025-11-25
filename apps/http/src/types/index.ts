import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
});
export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});
