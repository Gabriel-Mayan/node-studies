import { NextFunction, Request, Response } from "express";
import { multerUpload as multer } from "@services/multer";

export const MulterAdapter = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer.array("file");

  upload(req, res, (error) => {
    if (error) {
      return res.status(500).json(error.errors);
    }

    next();
  });
};
