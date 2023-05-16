import bcrypt from 'bcrypt-ts';

export const encryptData = async (data: string): Promise<string> => await bcrypt.hash(data, 10);
export const compareData = async (data: string, hash: string): Promise<boolean> => await bcrypt.compare(data, hash);
