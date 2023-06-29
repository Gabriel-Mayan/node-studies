import { ObjectSchema, AnyObject, ValidationError } from "yup";

export interface YupValidationError extends ValidationError {}

export type ISchema = ObjectSchema<object, AnyObject, object>;
export type IProperty = "query" | "body" | "params" | undefined;
