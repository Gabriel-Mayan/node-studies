import {
  NextFunction, Request, RequestHandler, Response,
} from "express";
import { multerUpload as multer } from "@/services/multer";

export const MulterAdapter: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer.array("file");

  upload(req, res, (error) => {
    if (error) {
      return res.status(500).json(error.errors);
    }

    next();
  });
};
