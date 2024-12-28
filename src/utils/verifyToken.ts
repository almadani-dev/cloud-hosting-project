import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

// For API's
export function verifyToken(req: NextRequest): JWTPayload | null {
  try {
    const token = req.cookies.get("token")?.value as string;

    if (!token) {
      return null;
    }

    const privateKey = process.env.JWT_SECRET as string;

    const userPayload = jwt.verify(token, privateKey) as JWTPayload;

    return userPayload;
  } catch {
    return null;
  }
}

// For Pages
export function verifyTokenPages(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;

    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    if (!userPayload) return null;

    return userPayload;
  } catch {
    return null;
  }
}
