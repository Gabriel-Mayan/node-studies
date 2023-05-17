import { IUserToken } from "@/types/user";
import { verify, sign } from "jsonwebtoken";

export const validateToken = (token: string) => verify(token, process.env.JWT_SECRET);
export const generateUserToken = (user: IUserToken) => sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
