export function invariant(condition: boolean, error: Error): void {
  if (!condition) {
    throw error;
  }
}
