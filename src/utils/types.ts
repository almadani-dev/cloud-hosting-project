import { Article, Comment, User } from "@prisma/client";
export type JWTPayload = {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
};

export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };
