import { Request, Response, NextFunction } from "express";
import { IRquestValidation, YupValidationError } from "types/yup";

// eslint-disable-next-line max-len, consistent-return
const validateRequest = ({ schema, property }: IRquestValidation) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = property ? request[property] : request;
    await schema.validate(data, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};

export default validateRequest;
