import jwt from "jsonwebtoken";
import { IUserToken } from "@/types/user";

export const validateToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET);
export const generateUserToken = (user: IUserToken) => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
