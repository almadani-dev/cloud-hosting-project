import { z } from "zod";

// Create Article Schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "The title is required",
      invalid_type_error: "The title must be a string",
    })
    .min(2, { message: "The title must be more than two characters" })
    .max(200, { message: "The title must be less than 200 characters" }),

  description: z
    .string({
      required_error: "The description is required",
      invalid_type_error: "The description must be a string",
    })
    .min(2, { message: "The description must be more than two characters" }),
});

export const registerSchema = z.object({
  username: z.string().min(2).max(100),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z.string().min(8),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8),
});

export const createCommentSchema = z.object({
  text: z.string().min(3).max(200),
  articleId: z.number(),
});
