class DocumentFileSizeValidator {
  private fileSizeInBytes: Number;
  private maxFileSizeInBytes: Number = 20971520;

  constructor(fileSizeInBytes: Number) {
    this.fileSizeInBytes = fileSizeInBytes;
  }
  validateFileSize(): boolean {
    return this.fileSizeInBytes <= this.maxFileSizeInBytes;
  }

  getErrorMessage(): string {
    return "File size must be less than 20 MB";
  }
}

export default DocumentFileSizeValidator;
