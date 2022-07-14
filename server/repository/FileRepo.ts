import connection from "../db";
import UploadedFile from "../models/UploadedFile";

let instance: null | FileRepo = null;

class FileRepo {
  static getInstance(): FileRepo {
    if (instance === null) {
      instance = new FileRepo();
      return instance;
    }
    return instance;
  }

  async createFileRepo(file: UploadedFile): Promise<Number> {
    try {
      return await new Promise((resolve, reject) => {
        connection.query(
          "insert into uploaded_file (file_name, unique_file_name, file_size, file_extension) VALUES (?, ?, ?, ?)",
          [
            file.originalFileName,
            file.uniqueFileName,
            file.fileSize,
            file.fileExtension,
          ],
          (error, results) => {
            if (error) {
              console.log(error.message);
              return 0;
            }
            resolve(results.insertId);
          }
        );
      });
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

export default FileRepo.getInstance();
