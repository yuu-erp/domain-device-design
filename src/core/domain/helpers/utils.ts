export function invariant(condition: boolean, error: Error): void {
  if (!condition) {
    throw error;
  }
}
export function isEmpty(obj: unknown): boolean {
  if (obj == null) return true;
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }
  return !obj;
}
