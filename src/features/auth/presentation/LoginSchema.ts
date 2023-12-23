import { z } from "zod";

const LoginSchema = z
  .object({
    username: z.string().max(30).min(4),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default LoginSchema;
