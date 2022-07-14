import express from "express";
import path from "path";
import {
  validateFileSize,
  validateFileType,
} from "../service/fileValidatorService";
import FileUploadService from "../service/fileUploadService";

let instance: null | FileController = null;

class FileController {
  static getInstance(): FileController {
    if (instance === null) {
      instance = new FileController();
      return instance;
    }
    return instance;
  }
  async uploadFile(req: express.Request, res: express.Response) {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).send("No file received");
        return;
      }

      const validFileSize = await validateFileSize(file.size);
      const validFileType = await validateFileType(
        path.extname(file.originalname)
      );

      if (!validFileSize.isValid || !validFileType.isValid) {
        return res.status(400).json({
          success: false,
          error: "Invalid request",
        });
      }

      const fileUploadService = new FileUploadService(file);
      const fileId = await fileUploadService.createFileUpload();

      if (fileId === 0) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
        });
      }

      return res.json({
        success: true,
        fileId,
        message: "File uploaded successfully",
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Error uploading file",
      });
    }
  }
}

export default FileController.getInstance();
