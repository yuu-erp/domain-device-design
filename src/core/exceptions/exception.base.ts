export interface NormalizedException {
  message: string;
  code: string;
  correlationId: string;
  stack?: string;
  cause?: string;
  /**
   * ^ Consider adding optional `metadata` object to
   * exceptions (if language doesn't support anything
   * similar by default) and pass some useful technical
   * information about the exception when throwing.
   * This will make debugging easier.
   */
  metadata?: Record<string, unknown>;
}

export abstract class ExceptionBase extends Error {
  abstract code: string;
  readonly correlationId: string;
  cause?: string; // Khai báo thuộc tính `cause` là tùy chọn

  /**
   * @param {string} message
   * @param {Error} [cause]
   * @param {Record<string, unknown>} [metadata]
   */
  constructor(
    readonly message: string,
    cause?: Error,
    readonly metadata?: Record<string, unknown>
  ) {
    super(message);

    // Tạo stack trace thủ công khi không có `captureStackTrace`
    this.stack = new Error().stack;

    // Tạo correlationId giả sử từ context hoặc từ mã nguồn
    const ctx = {
      requestId: "1", // Đây có thể là context thực tế trong ứng dụng của bạn
    };
    this.correlationId = ctx.requestId;

    // Gắn nguyên nhân lỗi nếu có
    if (cause) {
      this.cause = cause.message; // Lưu lại thông điệp của lỗi gốc nếu có
    }
  }

  toJSON(): NormalizedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: this.cause,
      metadata: this.metadata,
    };
  }
}
