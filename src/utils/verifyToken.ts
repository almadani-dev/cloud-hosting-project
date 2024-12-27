import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

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
