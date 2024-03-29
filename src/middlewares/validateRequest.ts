import { Response, NextFunction } from "express";
import { RequestWithUserRole } from "types/express";
import { YupValidationError, ISchema, IProperty } from "types/yup";

const validateRequest = (
  schema: ISchema,
  property?: IProperty,
) => async (request: RequestWithUserRole, response: Response, next: NextFunction) => {
  try {
    const data = property ? request[property] : request;
    await schema.validate(data, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};

export default validateRequest;
