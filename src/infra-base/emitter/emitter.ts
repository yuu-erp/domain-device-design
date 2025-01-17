// event-emitter.ts
export class Emitter {
  private events: Record<string, Function[]> = {};

  on(event: string, listener: Function): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event: string, ...args: any[]): void {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }

  // Phát sự kiện bất đồng bộ nếu cần
  async emitAsync(event: string, ...args: any[]): Promise<void> {
    if (this.events[event]) {
      await Promise.all(
        this.events[event].map((listener) => listener(...args))
      );
    }
  }
}
