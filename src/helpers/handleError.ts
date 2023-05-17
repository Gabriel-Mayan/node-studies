import { IDevError, IProdError } from "@/types/error";

export const formatErrorProd = (error: Error): IProdError => {
  console.log(error);
  return {
    type: Error.name,
    error: 'Something went wrong',
  };
};

export const formatDevError = (error: Error): IDevError => {
  return {
    type: error.name,
    error: error.message,
    errorObj: error,
    stack: error.stack || '',
  };
};
