interface ValidatorResponse {
  isValid: boolean;
  errorMessage: string;
}

export default ValidatorResponse;

const fileTypes = [".png", ".doc", ".docx", ".jpeg"];

async function validateFileSize(fileSize: number): Promise<ValidatorResponse> {
  const documentsFileSizeValidator = (
    await import("../validators/DocumentFileSizeValidator")
  ).default;
  const validator = new documentsFileSizeValidator(fileSize);
  const isValid = validator.validateFileSize();
  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

async function validateFileType(fileType: string): Promise<ValidatorResponse> {
  const fileTypeValidator = (await import("../validators/FileTypeValidator"))
    .default;
  const validator = new fileTypeValidator(fileType, fileTypes);
  const isValid = validator.validateFileType();
  return {
    isValid,
    errorMessage: isValid ? "" : validator.errorMessage(),
  };
}

export { validateFileSize, validateFileType };
