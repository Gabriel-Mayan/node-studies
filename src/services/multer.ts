import { Request, Express } from "express";
import multer, { FileFilterCallback } from "multer";

import { generateUuid } from "@helpers/handleUuid";
import { DestinationCallback, FileNameCallback } from "types/multer";

const MAX_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024;

const fileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback): void => {
    // ...Do your stuff here.
  },

  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    const filename = `${generateUuid()}-${file.originalname}`;
    callback(null, filename);
  },
});

const filter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  const allowedMimes: string[] = ["image/jpeg", "image/png", "image/gif"];
  const isAllowedMime = !!allowedMimes.includes(file.mimetype);

  if (!isAllowedMime) {
    req.fileError = "Invalid file type. Only .jpeg, .png and .gif format allowed.";
  }

  callback(null, isAllowedMime);
};

export const multerUpload = multer({
  storage: fileStorage,
  fileFilter: filter,
  limits: { fileSize: MAX_FILE_SIZE_IN_BYTES },
});
