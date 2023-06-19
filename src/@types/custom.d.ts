declare namespace Express {
  export interface Request {
    user: any;
    file: any;
    fileError: string | null;
  }
}

declare module "bcrypt-ts";
