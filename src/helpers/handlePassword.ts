import { hash, compare } from "bcrypt-ts";

export const encryptPassword = (password: string):string => hash(password, 10);
export const comparePassword = (pwd: string, compPwd: string):boolean => compare(pwd, compPwd);
