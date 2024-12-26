import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(jwtPayload: JWTPayload) {
  const expiresIn = { expiresIn: "1d" };
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(jwtPayload, secret, expiresIn);
  return token;
}
