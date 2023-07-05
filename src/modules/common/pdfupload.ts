/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import pathconfig from '../../config/pathconfig.json';

export const multerConfig = {
  dest: `./${pathconfig.FilePath}/resumes/${uuidv4()}`,
};

export const pdfFilesUpload = {
  fileFilter: (_req: any, file: any, cb: any) => {
    if (!file.mimetype.match(/\/(pdf|doc|docx)$/)) {
      return cb(new Error('Only pdf/doc/docx files are allowed!'), false);
    }
    cb(null, true);
  },

  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },

    filename: (req: any, file: any, cb: any) => {
      cb(null, file.originalname);
    },
  }),
};
