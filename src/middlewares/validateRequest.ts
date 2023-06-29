import { ObjectSchema, AnyObject } from "yup";
import { Request, Response, NextFunction } from "express";

import { YupValidationError } from "types/yup";

export const validateRequest = (
  schema: ObjectSchema<object, AnyObject, object>,
  property: "query" | "body" | "params" | undefined,
) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = property ? request[property] : request;
    await schema.validate(data, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};
