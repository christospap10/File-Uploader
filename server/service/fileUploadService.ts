import path from "path";
import { v4 as uuidv4 } from "uuid";
import fileRepo from "../repository/FileRepo";
import fs from "fs";

class FileUploadService {
  private file: Express.Multer.File;
  constructor(file: Express.Multer.File) {
    this.file = file;
  }

  private getFileExtension(): string {
    return path.extname(this.file.originalname);
  }

  async createFileUpload(): Promise<Number> {
    const uniqueFileName = await this.createUniqueFileName(
      this.file.originalname
    );
    const fileId = await this.createFileRecord(uniqueFileName);
    this.writeToFileStream(uniqueFileName);
    if (fileId > 0) {
      return fileId;
    }
    return 0;
  }

  private async createUniqueFileName(fileName: string): Promise<string> {
    const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    return `${uuidv4()}_${timeStamp}${this.getFileExtension()}`;
  }

  private async createFileRecord(uniqueFileName: string): Promise<Number> {
    return await fileRepo.createFileRepo({
      originalFileName: this.file.originalname,
      uniqueFileName,
      fileSize: this.file.size,
      fileExtension: this.getFileExtension(),
    });
  }

  private writeToFileStream(uniqueFileName: string) {
    const fileStream = fs.createWriteStream(
      `${__dirname}/../image/${uniqueFileName}`
    );
    fileStream.write(this.file.buffer, "base64");
    fileStream.on("error", (error) => {
      console.log(`Error writing file: ${error.message}`);
    });
    fileStream.on("close", () => {
      console.log("File stream closed");
    });
    fileStream.end();
  }
}

export default FileUploadService;
