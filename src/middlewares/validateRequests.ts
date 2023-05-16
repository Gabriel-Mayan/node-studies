import { ObjectSchema, ValidationError} from 'yup';
import { Request, Response, NextFunction } from 'express';

interface YupValidationError extends ValidationError {}

const validateRequest = (schema: ObjectSchema<any>) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validate(request, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};

const validateBody = (schema: ObjectSchema<any>) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validate(request.body, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};

const validateParams = (schema: ObjectSchema<any>) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validate(request.params, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};

const validateQuery = (schema: ObjectSchema<any>) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await schema.validate(request.query, { abortEarly: false });
    next();
  } catch (error: YupValidationError | any) {
    return response.status(500).json(error.errors);
  }
};

export { validateRequest, validateBody, validateParams, validateQuery };
