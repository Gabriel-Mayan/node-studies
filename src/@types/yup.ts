import { ObjectSchema, ValidationError } from "yup";

export interface IRquestValidation {
  property: "query" | "body" | "params" | "",
  schema: ObjectSchema<any>
}

export interface YupValidationError extends ValidationError {}
