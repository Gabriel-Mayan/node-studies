import * as bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => bcrypt.hash(password, 10);
export const comparePassword = async (password: string, comparePwd: string | undefined) => {
  if (!comparePassword) {
    return false;
  }

  return bcrypt.compare(password, String(comparePwd));
};
