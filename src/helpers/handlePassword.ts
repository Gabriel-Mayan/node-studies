import { hash, compare } from "bcryptjs";

export const encryptPassword = async (password: string) => hash(password, 10);
export const comparePassword = async (pwd: string, compPwd: string) => compare(pwd, compPwd);
