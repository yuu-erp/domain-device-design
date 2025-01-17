export function invariant(condition: boolean, error: Error): void {
  if (!condition) {
    throw error;
  }
}
export function isEmpty(obj: unknown): boolean {
  if (obj == null) return true; // Nếu là null hoặc undefined
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0; // Kiểm tra đối tượng rỗng
  }
  return !obj; // Kiểm tra chuỗi rỗng, số 0, false, NaN
}
