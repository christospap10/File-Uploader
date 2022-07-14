class FileTypeValidator {
  private fileType: string;
  private validTypes: string[];
  constructor(filetype: string, validTypes: string[]) {
    this.fileType = filetype;
    this.validTypes = validTypes;
  }

  validateFileType(): boolean {
    return this.validTypes.includes(this.fileType);
  }

  errorMessage(): string {
    return (
      "File type must be one of the following: " + this.validTypes.join(", ")
    );
  }
}

export default FileTypeValidator;
