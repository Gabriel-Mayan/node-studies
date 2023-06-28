import { ObjectSchema } from "yup";
import { Request, Response, NextFunction } from "express";

import { YupValidationError } from "types/yup";

// eslint-disable-next-line max-len, consistent-return
export const validateRequest = (
  schema: ObjectSchema<any>,
  property: "query" | "body" | "params" | "",
) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = property ? request[property] : request;
    await schema.validate(data, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};
