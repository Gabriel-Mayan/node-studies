import { IDevError, IProdError } from "types/error";

export const formatErrorProd = (error: Error): IProdError => ({
  type: Error.name,
  error: "Something went wrong",
});

export const formatDevError = (error: Error): IDevError => ({
  type: error.name,
  error: error.message,
  errorObj: error,
  stack: error.stack || "",
});
