export enum DappErrorCode {
  NOT_FOUND = "DAPP_NOT_FOUND",
  ALREADY_EXISTS = "DAPP_ALREADY_EXISTS",
  VALIDATION_FAILED = "DAPP_VALIDATION_FAILED",
  DELETE_FAILED = "DAPP_DELETE_FAILED",
}

export class DappException extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = "DappException";
    this.code = code;
  }
}

export class DappNotFoundException extends DappException {
  constructor(dappId: string) {
    super(`Dapp with ID ${dappId} not found.`, DappErrorCode.NOT_FOUND);
    this.name = "DappNotFoundException";
  }
}

export class DappAlreadyExistsException extends DappException {
  constructor(dappName: string) {
    super(
      `Dapp with name "${dappName}" already exists.`,
      DappErrorCode.ALREADY_EXISTS
    );
    this.name = "DappAlreadyExistsException";
  }
}

export class DappValidationException extends DappException {
  constructor(message: string) {
    super(
      `Dapp validation failed: ${message}`,
      DappErrorCode.VALIDATION_FAILED
    );
    this.name = "DappValidationException";
  }
}
