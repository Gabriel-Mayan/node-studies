import { v4 as uuidv4, validate, V4Options } from "uuid";

export const validateUuid = (params: string): boolean => validate(params);
export const generateUuid = (params: V4Options): string => String(uuidv4(params));
