import jwt from "jsonwebtoken";
import { IUserToken } from "@/types/user";

export const generateUserToken = (user: IUserToken) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const validateToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
