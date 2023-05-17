import { hash, compare } from 'bcrypt-ts';

export const encryptData = async (data: string): Promise<string> => await hash(data, 10);
export const compareData = async (data: string, hash: string): Promise<boolean> => await compare(data, hash);
