import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";

// generate JWT token
export function generateJWT(jwtPayload: JWTPayload) {
  const expiresIn = { expiresIn: "1d" };
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(jwtPayload, secret, expiresIn);
  return token;
}

export function setCookie(jwtPayload: JWTPayload) {
  const token = generateJWT(jwtPayload);
  // Save token to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }

  const cookie = serialize("token", token, {
    secure: process.env.NODE_ENV === "production", // development: false, production: true
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return cookie;
}
